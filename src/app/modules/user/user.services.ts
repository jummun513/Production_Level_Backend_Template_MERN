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

export const userServices = {
  createUserIntoDB,
};
