import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user/user.models';
import { TLoginUser } from './auth.interfaces';
import { createToken, verifyToken } from './auth.utils';
import config from '../../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../../utils/sendEmail';
import {
  forgetPasswordEmailTemplate,
  verificationEmailTemplate,
} from '../../../utils/emailTemplates';
import { otpGenerator } from '../../../utils/otpGenerator';

const loginUserFromDB = async (payload: TLoginUser) => {
  const result = await User.findOne({ email: payload.email }).select(
    '+password -isDeleted -__v'
  );

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, result?.password))) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    userId: result.userId as string,
    userName: result.userName,
    email: result.email,
    role: result.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_access_secret as string,
    config.jwt_refresh_access_secret_expires_in as string
  );

  // send selective data to frontend
  const user = result.toObject({
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
    },
  });

  return { accessToken, refreshToken, user };
};

const refreshTokenToAccessToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(
    token,
    config.jwt_refresh_access_secret as string
  );

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email }, { __v: 0, isDeleted: 0 });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  const jwtPayload = {
    userId: user.userId as string,
    userName: user.userName,
    email: user.email,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const result = await User.findOne({ email: userData.email }).select(
    '+password -isDeleted -__v'
  );

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.oldPassword, result?.password))) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const forgetPasswordService = async (payload: {
  email?: string;
  userName?: string;
}) => {
  const user = await User.findOne({
    $or: [{ email: payload?.email }, { userName: payload?.userName }],
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not registered!');
  }

  const jwtPayload = {
    userId: user.userId as string,
    userName: user.userName,
    email: user.email,
    role: user.role as string,
  };

  const passwordResetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '24h'
  );

  const resetLink = `${config.front_end_link}/reset-password/${user.role}?payload=${payload?.email || payload?.userName}&token=${passwordResetToken}`;

  const fullName = [
    user?.name?.firstName,
    user?.name?.middleName,
    user?.name?.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  await sendEmail(
    user?.email,
    'Reset your Nodemailer account password!',
    forgetPasswordEmailTemplate
      .replace('{user}', fullName || 'User')
      .replace('{resetLink}', resetLink)
  );

  const result =
    user.email.slice(0, 3) +
    '***' +
    user.email.split('@')[0].slice(-2) +
    '@' +
    user.email.split('@')[1];

  return result;
};

const resetPasswordService = async (
  payload: {
    email?: string;
    userName?: string;
    newPassword: string;
  },
  token: string
) => {
  const user = await User.findOne({
    $or: [{ email: payload?.email }, { userName: payload?.userName }],
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not registered!');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);

  if (user?.email !== decoded?.email || user?.userName !== decoded?.userName) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden access detected!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    {
      $or: [{ email: decoded?.email }, { userName: decoded?.userName }],
      role: decoded?.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
};

const verifyCodeService = async (
  payload: { verifyCode?: string },
  token: string
) => {
  const decoded = verifyToken(
    token,
    config.jwt_refresh_access_secret as string
  );

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email }).select(
    '+verifyCode +verifyCodeExpiredAt -isDeleted -__v'
  );

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  if (!user.verifyCode) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No verify code found!');
  }

  const expiredAt = user.verifyCodeExpiredAt as unknown as Date;

  if (expiredAt.getTime() < Date.now()) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Verify code expired!');
  }

  if (user.verifyCode !== payload.verifyCode) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong code!');
  }

  await User.findOneAndUpdate(
    { email },
    {
      isEmailVerified: true,
      verifyCode: undefined,
    }
  );
};

const resendVerifyCodeService = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(
    token,
    config.jwt_refresh_access_secret as string
  );

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email }, { __v: 0, isDeleted: 0 });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  const verifyCode = otpGenerator();
  const fullName = [
    user?.name?.firstName,
    user?.name?.middleName,
    user?.name?.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  await User.findOneAndUpdate(
    { email },
    {
      verifyCode,
      verifyCodeExpiredAt: new Date(Date.now() + 30 * 24 * 3600 * 1000), // for 30 days
    }
  );

  await sendEmail(
    user?.email,
    'Your email confirmation OTP',
    verificationEmailTemplate
      .replace('{user}', fullName || 'User')
      .replace('{verificationCode}', verifyCode)
  );

  const result =
    user?.email.slice(0, 3) +
    '***' +
    user?.email.split('@')[0].slice(-2) +
    '@' +
    user?.email.split('@')[1];

  return result;
};

export const authServices = {
  loginUserFromDB,
  refreshTokenToAccessToken,
  changePasswordIntoDB,
  forgetPasswordService,
  resetPasswordService,
  verifyCodeService,
  resendVerifyCodeService,
};
