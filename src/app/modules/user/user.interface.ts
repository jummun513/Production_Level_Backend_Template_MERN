export type TUser = {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  isDeleted: boolean;
};
