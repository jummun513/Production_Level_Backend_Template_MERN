/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { model, Schema } from 'mongoose';
import {
  CategoryMethods,
  CategoryModel,
  TCategory,
} from './category.interfaces';
import ApiError from '../../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const categorySchema = new Schema<TCategory, CategoryModel, CategoryMethods>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Category name is required.'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// convert mongoose document to plain object for remove sensitive object
categorySchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.isDeleted;
    return ret;
  },
});

// method for check before findOne and updateOne user is exist or not
categorySchema.methods.isCategoryExist = async function isCategoryExistFunc(
  categoryId: string
): Promise<any> {
  const existingProduct = await Category.findById(categoryId);
  if (!existingProduct) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return existingProduct;
};

export const Category = model<TCategory, CategoryModel>(
  'category',
  categorySchema
);
