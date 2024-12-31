/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../categories/category/category.models';
import { Product } from './product/product.models';

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // searching
  const productSearchableFields = [
    'productCode',
    'productName',
    'desc',
    'serialNo',
  ];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const categories = await Category.find({
    name: { $regex: searchTerm, $options: 'i' },
  }).select('_id'); // Get the IDs of matching categories
  const searchQueryPromise = Product.find({
    $or: [
      ...productSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
      { tags: { $in: [searchTerm] } },
      { category: { $in: categories.map((cat) => cat._id) } }, // Match products by category IDs
      {
        stock: { $elemMatch: { color: { $regex: searchTerm, $options: 'i' } } },
      },
    ],
  }).populate('category');

  // filtering
  const directFilterQueryObj = { ...query };
  const excludeFields = [
    'searchTerm',
    'category',
    'tags',
    'maxPrice',
    'minPrice',
    'rating',
    'color',
    'sizes',
    'sortBy',
    'page',
    'limit',
    'fields',
  ];
  excludeFields.forEach((el) => delete directFilterQueryObj[el]);
  let filterQueryObj = {};
  if (query?.category) {
    filterQueryObj = { ...filterQueryObj, 'category.name': query.name };
  }
  if (query?.tags) {
    const tagArray = (query.tags as string).split(',');
    filterQueryObj = { ...filterQueryObj, tags: { $all: tagArray } };
  }
  if (query?.color || query?.size) {
    const filter: any = {};
    filter.stock = {};
    if (query.color) {
      filter.stock.color = query.color;
    }
    if (query.size) {
      filter.stock[`sizes.${query.size}`] = { $gt: 0 }; // Checks if size exists and is > 0
    }
    filterQueryObj = { ...filterQueryObj, ...filter };
  }
  if (query?.maxPrice && query?.minPrice) {
    filterQueryObj = {
      ...filterQueryObj,
      price: {
        $gte: parseFloat(query.minPrice as string),
        $lte: parseFloat(query.maxPrice as string),
      },
    };
  } else if (query?.maxPrice) {
    filterQueryObj = {
      ...filterQueryObj,
      price: { $lte: parseFloat(query.maxPrice as string) },
    };
  } else if (query?.minPrice) {
    filterQueryObj = {
      ...filterQueryObj,
      price: { $gte: parseFloat(query.minPrice as string) },
    };
  }
  const filterQueryPromise = searchQueryPromise.find({
    ...directFilterQueryObj,
    ...filterQueryObj,
  });

  // sorting
  let sort = '-createdAt';
  if (query?.sortBy) {
    sort = (query.sortBy as string).split(',').join(' ');
  }
  const sortQueryPromise = filterQueryPromise.sort(sort);

  // paginating
  let page = 1;
  let limit = 10;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }
  const skipQueryPromise = sortQueryPromise.skip(skip);
  const paginateQueryPromise = skipQueryPromise.limit(limit);

  // fields limiting
  let fields = '-__v';
  if (query?.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }
  const fieldsQueryPromise = paginateQueryPromise.select(fields);
  const result = await paginateQueryPromise.select(fields);

  // counting for meta data base on query
  const totalQueries = fieldsQueryPromise.getFilter();
  const total = await fieldsQueryPromise.model.countDocuments(totalQueries);

  return {
    data: result,
    meta: {
      page: page,
      limit: limit,
      total: total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

export const productsServices = {
  getAllProductsFromDB,
};
