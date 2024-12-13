import { Model } from 'mongoose';

export type TUser = {
  userId: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  isDeleted: boolean;
};

// statics method
export interface UserStatics extends Model<TUser> {
  userNameAlreadyExist(userName: string): Promise<TUser | null>; // when not use mongoose unique
  isUserExists(userId: string): Promise<TUser | null>;
}
