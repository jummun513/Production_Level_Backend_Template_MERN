import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user/user.models';
import { TLoginUser } from './auth.interfaces';
import { createToken } from './auth.utils';
import config from '../../../config';

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

  // send selective data to frontend
  const user = result.toObject({
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
    },
  });

  return { accessToken, user };
};

export const authServices = {
  loginUserFromDB,
};
