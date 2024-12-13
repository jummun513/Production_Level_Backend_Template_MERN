/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  await UserModel.userNameAlreadyExist(user?.userName);
  const result = await UserModel.create(user);

  // send selective data to frontend
  // const sendData = result.toObject({
  //   virtuals: false,
  //   versionKey: false,
  //   transform: (doc, ret) => {
  //     delete ret.__v;
  //     delete ret.password;
  //   },
  // });

  return result.toObject();
};

const getSingleUserFromDB = async (userId: string) => {
  await UserModel.isUserExists(userId);
  const result = await UserModel.findById(userId);

  // selective data retrieve
  // const result = await UserModel.findById(userId, {
  //   __v: 0,
  //   password: 0,
  //   isDeleted: 0,
  // });

  return result?.toObject();
};

const updateSingleUserIntoDB = async (userId: string) => {
  const result = await UserModel.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
};
