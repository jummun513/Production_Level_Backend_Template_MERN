import { Model } from 'mongoose';
import { GENDERS, USER_ROLES } from './user.constants';

export type TGenders = (typeof GENDERS)[number];
export type TUserRole = keyof typeof USER_ROLES;

export type TUser = {
  userId?: string;
  userName: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName?: string;
  };
  role?: 'superAdmin' | 'admin' | 'user';
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  thumbnail?: object;
  isDeleted?: boolean;
};

// statics method
export interface UserStatics extends Model<TUser> {
  userNameAlreadyExist(userName: string): Promise<TUser | null>; // when not use mongoose unique
  isUserExist(userId: string): Promise<TUser | null>; // for edit or searching is user exit or not
}
