/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  await ProductModel.productNameAlreadyExist(product?.productName);
  const result = await ProductModel.create(product);

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
  await ProductModel.isProductExists(productId);
  const result = await ProductModel.findById(productId);

  // selective data retrieve
  // const result = await UserModel.findById(userId, {
  //   __v: 0,
  //   password: 0,
  //   isDeleted: 0,
  // });

  return result?.toObject();
};

const updateSingleProductIntoDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const productServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
};
