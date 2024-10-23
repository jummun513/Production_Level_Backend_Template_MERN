/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);

  // send selective data to frontend
  const sendData = result.toObject({
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
    },
  });
  return sendData;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findById(userId, { __v: 0, password: 0 });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getSingleUserFromDB,
};
