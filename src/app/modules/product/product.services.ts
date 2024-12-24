/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';
import { generateProductId } from './product.utils';

const createProductIntoDB = async (product: TProduct) => {
  await ProductModel.productNameAlreadyExist(product?.productName);

  const generatedId = await generateProductId(product);

  const result = await ProductModel.create({
    serialNo: generatedId,
    ...product,
  });

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

const getAllProductsFromDB = async () => {
  const dataQuery = ProductModel.find({}, { __v: 0, isDeleted: 0 })
    .skip(0)
    .limit(0)
    .exec();
  const countQuery = ProductModel.countDocuments().exec();
  const [data, count] = await Promise.all([dataQuery, countQuery]);
  return { data: data, meta: { page: 1, limit: 0, total: count } };
};

const getSingleProductFromDB = async (productId: string) => {
  await ProductModel.isProductExist(productId);
  const result = await ProductModel.findById(productId);

  // selective data retrieve
  // const result = await UserModel.findById(userId, {
  //   __v: 0,
  //   password: 0,
  //   isDeleted: 0,
  // });

  return result?.toObject();
};

const softDeleteSingleProductFromDB = async (productId: string) => {
  await ProductModel.isProductExist(productId);
  const result = await ProductModel.findByIdAndUpdate(productId, {
    isDeleted: true,
  });
  if (result) {
    return;
  } else {
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Invalid response!');
  }
};

const updateSingleProductIntoDB = async (
  productId: string,
  payLoad: Partial<TProduct>
) => {
  await ProductModel.isProductExist(productId);

  const result = await ProductModel.findByIdAndUpdate(productId, payLoad, {
    new: true,
  });

  if (result) {
    return result;
  } else {
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Invalid response!');
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  softDeleteSingleProductFromDB,
  updateSingleProductIntoDB,
};
