import { z } from 'zod';
import { COLORS, PriceUnit } from './product.constant';

const stockCreateValidationSchema = z.object({
  color: z.enum(COLORS, { required_error: 'Color is required.' }),
  sizes: z.object({
    S: z.number().min(0).default(0),
    M: z.number().min(0).default(0),
    L: z.number().min(0).default(0),
    XL: z.number().min(0).default(0),
    '2XL': z.number().min(0).default(0),
    '3XL': z.number().min(0).default(0),
  }),
});

const reviewCreateValidationSchema = z.object({
  userId: z.string().nonempty({ message: 'User ID is required.' }),
  comment: z.string().nonempty({ message: 'Comment is required.' }),
  rating: z
    .number()
    .min(0)
    .max(5)
    .nonnegative({ message: 'Rating is required.' }),
  date: z.string().nonempty({ message: 'Date is required.' }),
});

const productCreateValidationSchema = z.object({
  productCode: z.string({
    required_error: 'Product code field is required!',
    invalid_type_error: 'Product code field allowed only string!',
  }),
  productName: z.string({
    required_error: 'Product name field is required!',
    invalid_type_error: 'Product name field allowed only string!',
  }),
  desc: z.string({
    required_error: 'Description field is required!',
    invalid_type_error: 'Description field allowed only string!',
  }),
  price: z
    .number({
      required_error: 'Price field is required!',
      invalid_type_error: 'Price field allowed only number!',
    })
    .min(0, { message: 'Minimum price should be 0.' })
    .refine((value) => value === parseFloat(value.toFixed(2)), {
      message: 'Price must have at most 2 decimal places.',
    }),
  priceUnit: z.enum(PriceUnit, { required_error: 'Price Unit is required.' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer.' })
    .min(0, { message: 'Quantity must be a positive integer.' }),
  stock: z.array(stockCreateValidationSchema).optional(),
  category: z.string({
    required_error: 'Category field is required!',
    invalid_type_error: 'Category field allowed only string!',
  }),
});

const productUpdateValidationSchema = z.object({
  reviews: z.array(reviewCreateValidationSchema).optional(),
});

export const productValidations = {
  productCreateValidationSchema,
  productUpdateValidationSchema,
};
