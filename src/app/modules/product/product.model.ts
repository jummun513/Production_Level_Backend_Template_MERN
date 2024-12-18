/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from 'mongoose';
import { TProduct, ProductStatics } from './product.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { COLORS, PriceUnit } from './product.constant';

const stockSchema = new Schema({
  color: { type: String, required: [true, 'Color is required.'], enum: COLORS },
  sizes: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    '2XL': { type: Number, default: 0 },
    '3XL': { type: Number, default: 0 },
  },
});

const reviewSchema = new Schema({
  userId: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  date: { type: String, required: true },
  // ref: 'user',
});

const productSchema = new Schema<TProduct, ProductStatics>(
  {
    productCode: {
      type: String,
      required: [true, 'Product Code is required.'],
      unique: true,
    },
    productName: {
      type: String,
      required: [true, 'Product Name is required.'],
    },
    desc: {
      type: String,
      required: [true, 'Description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Minimum price should be 0.'],
      set: (value: number): number => parseFloat(value.toFixed(2)),
    },
    priceUnit: {
      type: String,
      required: [true, 'Price Unit is required.'],
      enum: PriceUnit,
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      min: [0, 'Quantity must be a positive integer'],
    },
    thumbnail: {
      type: Object,
      required: [true, 'Thumbnail image is required.'],
    },
    images: { type: [Object] },
    stock: [stockSchema],
    category: {
      type: String,
      required: [true, 'Category is required'],
      ref: 'category',
    },
    tags: { type: [String] },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5 },
    reviews: [reviewSchema],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// convert mongoose document to plain object for remove sensitive object
productSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.isDeleted;
    return ret;
  },
});

// soft delete data not send with user request find and findOne query
productSchema.pre(['find', 'findOne'], function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// soft delete data not send with user request aggregate query
productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// uniqueness apply without using mongoose unique: true
productSchema.statics.productNameAlreadyExist =
  async function productNameAlreadyExistFunc(
    productName: string
  ): Promise<any> {
    const existProductName = await ProductModel.findOne({ productName });
    if (existProductName) {
      throw new ApiError(StatusCodes.CONFLICT, 'Product name already exist!');
    }
  };

// method for check before findOne and updateOne user is exist or not
productSchema.statics.isProductExist = async function isProductExistFunc(
  productId: string
): Promise<any> {
  const existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return existingProduct;
};

export const ProductModel = model<TProduct, ProductStatics>(
  'product',
  productSchema
);
