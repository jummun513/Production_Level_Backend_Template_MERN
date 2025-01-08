import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email field is required!',
        invalid_type_error: 'Email field allowed only string!',
      })
      .email({ message: 'Invalid email address!' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const authValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
