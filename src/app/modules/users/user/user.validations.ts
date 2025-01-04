import { z } from 'zod';
import { GENDERS } from './user.constants';

const nameCreateValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name field is required!',
      invalid_type_error: 'First Name field allowed only string!',
    })
    .regex(/^[a-zA-Z. ]+$/, {
      message: 'First Name must contain only letters, space and dot!',
    })
    .min(3, { message: 'Last Name 3 or more characters long' }),
  middleName: z
    .string()
    .regex(/^[a-zA-Z. ]+$/, {
      message: 'First Name must contain only letters, space and dot!',
    })
    .min(2, { message: 'Last Name 2 or more characters long' })
    .optional(),
  lastName: z
    .string({
      required_error: 'First Name field is required!',
      invalid_type_error: 'First Name field allowed only string!',
    })
    .regex(/^[a-zA-Z. ]+$/, {
      message: 'First Name must contain only letters, space and dot!',
    })
    .min(2, { message: 'Last Name 2 or more characters long' }),
});

const userCreateValidationSchema = z.object({
  userName: z
    .string({
      required_error: 'User Name field is required!',
      invalid_type_error: 'User Name field allowed only string!',
    })
    .min(5, { message: 'Must be 5 or more characters long' })
    .max(15, { message: 'Must be 5 or fewer characters long' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'User Name can only contain letters, numbers, underscores, and hyphens!',
    }),
  name: nameCreateValidationSchema,
  email: z
    .string({
      required_error: 'Email field is required!',
      invalid_type_error: 'Email field allowed only string!',
    })
    .email({ message: 'Invalid email address!' }),
  phone: z
    .string({
      required_error: 'Phone number field is required!',
      invalid_type_error: 'Phone number field allowed only string!',
    })
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
      message: 'Phone number must be a valid Bangladeshi phone number!',
    }),
  password: z
    .string({
      required_error: 'Password field is required!',
      invalid_type_error: 'Password field allowed only string!',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character!',
      }
    ),
  gender: z.enum(GENDERS, {
    required_error: 'Gender field is required!',
    invalid_type_error:
      "Gender field must be a string and one of 'Male', 'Female', 'Other'!",
  }),
});

// update
const nameUpdateValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name field is required!',
      invalid_type_error: 'First Name field allowed only string!',
    })
    .regex(/^[a-zA-Z. ]+$/, {
      message: 'First Name must contain only letters, space and dot!',
    })
    .min(3, { message: 'Last Name 3 or more characters long' })
    .optional(),
  middleName: z
    .string()
    .regex(/^[a-zA-Z. ]+$/, {
      message: 'First Name must contain only letters, space and dot!',
    })
    .min(2, { message: 'Last Name 2 or more characters long' })
    .optional(),
  lastName: z
    .string({
      required_error: 'First Name field is required!',
      invalid_type_error: 'First Name field allowed only string!',
    })
    .regex(/^[a-zA-Z. ]+$/, {
      message: 'First Name must contain only letters, space and dot!',
    })
    .min(2, { message: 'Last Name 2 or more characters long' })
    .optional(),
});

const userUpdateValidationSchema = z.object({
  name: nameUpdateValidationSchema.optional(),
  email: z
    .string({
      required_error: 'Email field is required!',
      invalid_type_error: 'Email field allowed only string!',
    })
    .email({ message: 'Invalid email address!' })
    .optional(),
  phone: z
    .string({
      required_error: 'Phone number field is required!',
      invalid_type_error: 'Phone number field allowed only string!',
    })
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
      message: 'Phone number must be a valid Bangladeshi phone number!',
    })
    .optional(),
  gender: z
    .enum(GENDERS, {
      required_error: 'Gender field is required!',
      invalid_type_error:
        "Gender field must be a string and one of 'Male', 'Female', 'Other'!",
    })
    .optional(),
});

export const userValidations = {
  userCreateValidationSchema,
  userUpdateValidationSchema,
};
