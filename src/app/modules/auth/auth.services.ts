import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user/user.models';
import { TLoginUser } from './auth.interfaces';
import { createToken, verifyToken } from './auth.utils';
import config from '../../../config';

const loginUserFromDB = async (payload: TLoginUser) => {
  const user = await User.findOne(payload, { __v: 0, isDeleted: 0 });

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

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_access_secret as string,
    config.jwt_refresh_access_secret_expires_in as string
  );

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

export const authServices = {
  loginUserFromDB,
  refreshTokenToAccessToken,
};
