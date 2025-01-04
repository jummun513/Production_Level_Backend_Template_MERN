/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { StatusCodes } from 'http-status-codes';
import { TProduct } from './product.interfaces';
import { Product } from './product.models';
import { generateProductId } from './product.utils';
import ApiError from '../../../../errors/ApiError';

const createProductIntoDB = async (product: TProduct) => {
  await Product.productNameAlreadyExist(product?.productName);

  const generatedId = await generateProductId(product);

  const result = await Product.create({
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

const getSingleProductFromDB = async (productId: string) => {
  await Product.isProductExist(productId);
  const result = await Product.findById(productId);

  // selective data retrieve
  // const result = await UserModel.findById(userId, {
  //   __v: 0,
  //   password: 0,
  //   isDeleted: 0,
  // });

  return result?.toObject();
};

const softDeleteSingleProductFromDB = async (productId: string) => {
  await Product.isProductExist(productId);
  const result = await Product.findByIdAndUpdate(productId, {
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
  const product = await Product.isProductExist(productId);
  const { images, ...rest } = payLoad;
  const newPayLoad: Record<string, unknown> = { ...rest };

  if (images) {
    newPayLoad.images = [...(product?.images ?? []), ...images];
  }

  const result = await Product.findByIdAndUpdate(productId, newPayLoad, {
    new: true,
    runValidators: true,
  });

  if (result) {
    return result;
  } else {
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Invalid response!');
  }
};

export const productServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  softDeleteSingleProductFromDB,
  updateSingleProductIntoDB,
};
