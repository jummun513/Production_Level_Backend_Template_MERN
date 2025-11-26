/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import { TUser } from './user.interfaces';
import { User } from './user.models';
import { generateUserId } from './user.utils';
import { createToken } from '../../auth/auth.utils';
import config from '../../../../config';

const createUserIntoDB = async (user: TUser) => {
  await User.userNameAlreadyExist(user?.userName);

  const generatedId = await generateUserId();

  const result = await User.create({
    userId: generatedId, // interface userId should be optional otherwise typeError show here
    role: 'user', // interface role should be optional otherwise typeError show here
    ...user,
  });

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
  // const sendData = result.toObject({
  //   virtuals: false,
  //   versionKey: false,
  //   transform: (doc, ret) => {
  //     delete ret.__v;
  //     delete ret.password;
  //   },
  // });

  return { accessToken, user: result.toObject() };
};

// used _id to get single user
const getSingleUserFromDB = async (userId: string) => {
  await User.isUserExist(userId);
  const result = await User.findById(userId);

  // selective data retrieve
  // const result = await User.findById(userId, {
  //   __v: 0,
  //   password: 0,
  //   isDeleted: 0,
  // });

  return result?.toObject();
};

const softDeleteSingleUserFromDB = async (userId: string) => {
  const result = await User.findByIdAndUpdate(userId, {
    isDeleted: true,
  });
  if (result) {
    return;
  } else {
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Invalid response!');
  }
};

const updateSingleUserIntoDB = async (
  userId: string,
  payLoad: Partial<TUser>
) => {
  await User.isUserExist(userId);

  const { name, ...rest } = payLoad;
  const newPayLoad: Record<string, unknown> = { ...rest };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      newPayLoad[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(userId, newPayLoad, {
    new: true,
    runValidators: true,
  });

  if (result) {
    return result.toObject();
  } else {
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Invalid response!');
  }
};

export const userServices = {
  createUserIntoDB,
  getSingleUserFromDB,
  softDeleteSingleUserFromDB,
  updateSingleUserIntoDB,
};
