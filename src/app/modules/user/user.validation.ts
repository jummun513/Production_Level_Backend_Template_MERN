import { z } from 'zod';

const userCreateValidationSchema = z.object({
  userId: z.string({
    required_error: 'User ID field is required!',
    invalid_type_error: 'User ID field allowed only string!',
  }),
  userName: z
    .string({
      required_error: 'User Name field is required!',
      invalid_type_error: 'User Name field allowed only string!',
    })
    .min(5, { message: 'Must be 5 or more characters long' })
    .max(15, { message: 'Must be 5 or fewer characters long' }),
  firstName: z.string({
    required_error: 'First Name field is required!',
    invalid_type_error: 'First Name field allowed only string!',
  }),
  middleName: z.string({
    required_error: 'Middle Name field is required!',
    invalid_type_error: 'Middle Name field allowed only string!',
  }),
  lastName: z.string({
    required_error: 'Last Name field is required!',
    invalid_type_error: 'Last Name field allowed only string!',
  }),
  email: z.string({
    required_error: 'Email field is required!',
    invalid_type_error: 'Email field allowed only string!',
  }),
  phone: z.string({
    required_error: 'Phone number field is required!',
    invalid_type_error: 'Phone number field allowed only string!',
  }),
  password: z.string({
    required_error: 'Password field is required!',
    invalid_type_error: 'Password field allowed only string!',
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender field is required!',
    invalid_type_error:
      "Gender field must be a string and one of 'male', 'female', 'other'!",
  }),
});

export const userValidations = {
  userCreateValidationSchema,
};
