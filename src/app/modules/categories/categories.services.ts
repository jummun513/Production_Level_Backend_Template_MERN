import { Category } from './category/category.models';

const getAllCategoriesFromDB = async () => {
  const dataQuery = Category.find({}, { __v: 0, isDeleted: 0 })
    .skip(0)
    .limit(0)
    .exec();
  const countQuery = Category.countDocuments().exec();
  const [data, count] = await Promise.all([dataQuery, countQuery]);
  return { data: data, meta: { page: 1, limit: 0, total: count } };
};

export const categoriesServices = {
  getAllCategoriesFromDB,
};
