import { z } from 'zod';

const categoryCreateValidationSchema = z.object({
  name: z.string({
    required_error: 'Category name field is required!',
    invalid_type_error: 'Category name field allowed only string!',
  }),
});

export const categoryValidations = {
  categoryCreateValidationSchema,
};
