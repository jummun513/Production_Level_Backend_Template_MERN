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
  userId: z.string({
    required_error: 'User Id field is required!',
    invalid_type_error: 'User Id field allowed only string!',
  }),
  comment: z.string({
    required_error: 'Comments field is required!',
    invalid_type_error: 'Comments field allowed only string!',
  }),
  rating: z
    .number()
    .min(0)
    .max(5)
    .nonnegative({ message: 'Rating is required.' }),
  date: z.string({
    required_error: 'Date field is required!',
    invalid_type_error: 'Date field allowed only string!',
  }),
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
  productCode: z
    .string({
      invalid_type_error: 'Product code field allowed only string!',
    })
    .optional(),
  productName: z
    .string({
      invalid_type_error: 'Product name field allowed only string!',
    })
    .optional(),
  desc: z
    .string({
      invalid_type_error: 'Description field allowed only string!',
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: 'Price field allowed only number!',
    })
    .min(0, { message: 'Minimum price should be 0.' })
    .refine((value) => value === parseFloat(value.toFixed(2)), {
      message: 'Price must have at most 2 decimal places.',
    })
    .optional(),
  priceUnit: z
    .enum(PriceUnit, { required_error: 'Price Unit is required.' })
    .optional(),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer.' })
    .min(0, { message: 'Quantity must be a positive integer.' })
    .optional(),
  stock: z.array(stockCreateValidationSchema).optional(),
  category: z
    .string({
      required_error: 'Category field is required!',
      invalid_type_error: 'Category field allowed only string!',
    })
    .optional(),
  reviews: z.array(reviewCreateValidationSchema).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false).optional(),
  rating: z.number().min(0).max(5).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const productValidations = {
  productCreateValidationSchema,
  productUpdateValidationSchema,
};
