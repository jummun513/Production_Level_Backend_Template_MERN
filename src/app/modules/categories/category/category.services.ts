import { TCategory } from './category.interfaces';
import { Category } from './category.models';

const createCategoryIntoDB = async (category: TCategory) => {
  const result = await Category.create(category);

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

export const categoryServices = {
  createCategoryIntoDB,
};
