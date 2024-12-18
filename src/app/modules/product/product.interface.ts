import { Model } from 'mongoose';
import { COLORS, PriceUnit } from './product.constant';

export type TColors = (typeof COLORS)[number];
export type TPriceUnits = (typeof PriceUnit)[number];

export type TProduct = {
  productCode: string;
  productName: string;
  desc: string;
  price: number;
  priceUnit: string;
  quantity: number;
  thumbnail: object;
  images?: string[];
  stock: {
    [color: string]: {
      [size: string]: number;
    };
  };
  category: string;
  tags?: string[];
  isFeatured?: boolean;
  rating?: number;
  reviews?: Array<{
    userId: string;
    comment: string;
    rating: number;
    date: string;
    ref: string;
  }>;
  isDeleted: boolean;
};

// statics method
export interface ProductStatics extends Model<TProduct> {
  productNameAlreadyExist(productName: string): Promise<TProduct | null>; // when not use mongoose unique
  isProductExists(productId: string): Promise<TProduct | null>; // for edit or searching is product exit or not
}
