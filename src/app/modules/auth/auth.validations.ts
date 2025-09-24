import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email field is required!',
        invalid_type_error: 'Email field allowed only string!',
      })
      .email({ message: 'Invalid email address!' }),
    password: z
      .string({
        required_error: 'Password field is required!',
        invalid_type_error: 'Password field allowed only string!',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%(-){}*?&])[A-Za-z\d@$!#%(-){}*?&]{8,}$/,
        {
          message:
            'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character @$!#%-(){}*?&',
        }
      ),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({
        required_error: 'Old Password field is required!',
        invalid_type_error: 'Old Password field allowed only string!',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%(-){}*?&])[A-Za-z\d@$!#%(-){}*?&]{8,}$/,
        {
          message:
            'Old Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character @$!#%-(){}*?&',
        }
      ),
    newPassword: z
      .string({
        required_error: 'New Password field is required!',
        invalid_type_error: 'New Password field allowed only string!',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%(-){}*?&])[A-Za-z\d@$!#%(-){}*?&]{8,}$/,
        {
          message:
            'New Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character @$!#%-(){}*?&',
        }
      ),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z
    .object({
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
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email field is required!',
          invalid_type_error: 'Email field allowed only string!',
        })
        .email({ message: 'Invalid email address!' })
        .optional(),
    })
    .refine((data) => data.email || data.userName, {
      message: 'Either Email or User Name must be provided!',
      path: [], // Applies globally
    })
    .refine((data) => !(data.email && data.userName), {
      message: 'You cannot provide both Email and User Name!',
      path: [], // Applies globally
    }),
});

const resetPasswordValidationSchema = z.object({
  body: z
    .object({
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
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email field is required!',
          invalid_type_error: 'Email field allowed only string!',
        })
        .email({ message: 'Invalid email address!' })
        .optional(),
      newPassword: z
        .string({
          required_error: 'New Password field is required!',
          invalid_type_error: 'New Password field allowed only string!',
        })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%(-){}*?&])[A-Za-z\d@$!#%(-){}*?&]{8,}$/,
          {
            message:
              'New Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character @$!#%-(){}*?&',
          }
        ),
    })
    .refine((data) => data.email || data.userName, {
      message: 'Either Email or User Name must be provided!',
      path: [], // Applies globally
    })
    .refine((data) => !(data.email && data.userName), {
      message: 'You cannot provide both Email and User Name!',
      path: [], // Applies globally
    }),
});

const verifyCodeValidationSchema = z.object({
  body: z.object({
    verifyCode: z
      .string({
        required_error: 'Verify code field is required!',
        invalid_type_error: 'Verify code field allowed only string!',
      })
      .min(6, { message: 'Must be 6 digits' })
      .max(6, { message: 'Must be 6 digits' }),
  }),
});

export const authValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  verifyCodeValidationSchema,
};
