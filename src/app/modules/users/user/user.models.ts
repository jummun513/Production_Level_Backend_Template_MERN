/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from 'mongoose';
import { TUser, UserStatics } from './user.interfaces';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import { GENDERS } from './user.constants';

const nameSchema = new Schema({
  firstName: { type: String, required: [true, 'First Name is required.'] },
  middleName: { type: String },
  lastName: { type: String },
});

const userSchema = new Schema<TUser, UserStatics>(
  {
    userId: {
      type: String,
      required: [true, 'User Id is required.'],
      unique: true,
    },
    userName: {
      type: String,
      required: [true, 'User Name is required.'],
      unique: true,
    },
    name: nameSchema,
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required.'],
      enum: GENDERS,
    },
    thumbnail: { type: Object },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// convert mongoose document to plain object for remove sensitive/unwanted field
userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret?.password;
    delete ret.isDeleted;
    return ret;
  },
});

// soft delete data not send with user request find and findOne query
userSchema.pre(
  ['find', 'countDocuments', 'findOne', 'findOneAndUpdate'],
  function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  }
);

// soft delete data not send with user request aggregate query
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// uniqueness apply without using mongoose unique: true
userSchema.statics.userNameAlreadyExist =
  async function userNameAlreadyExistFunc(userName: string): Promise<any> {
    const existUserName = await User.findOne({ userName: userName });
    if (existUserName) {
      throw new ApiError(StatusCodes.CONFLICT, 'User name already exist!');
    }
  };

// method for check before findOne and updateOne user is exist or not
userSchema.statics.isUserExist = async function isUserExistFunc(
  userId: string
): Promise<any> {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  return existingUser;
};

export const User = model<TUser, UserStatics>('user', userSchema);
