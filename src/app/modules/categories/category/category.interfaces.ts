import { Model } from 'mongoose';

export type TCategory = {
  name: string;
  isDeleted: boolean;
};

// instance methods
export type CategoryMethods = {
  isCategoryExist(id: string): Promise<TCategory>;
};

export type CategoryModel = Model<
  TCategory,
  Record<string, never>,
  CategoryMethods
>;
