import { Product } from './product/product.models';

const getAllProductsFromDB = async () => {
  const dataQuery = Product.find({}, { __v: 0, isDeleted: 0 }).populate(
    'category',
    'name'
  );
  const countQuery = Product.countDocuments().exec();
  const [data, count] = await Promise.all([dataQuery, countQuery]);
  return { data: data, meta: { page: 1, limit: 0, total: count } };
};

export const productsServices = {
  getAllProductsFromDB,
};
