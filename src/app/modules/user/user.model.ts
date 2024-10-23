import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: String,
      required: [true, 'UserId is required.'],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
    },
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
      required: [true, 'password is required.'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required.'],
      enum: ['male', 'female', 'other'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<TUser>('User', userSchema);
