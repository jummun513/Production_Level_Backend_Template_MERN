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

export const authValidations = {
  loginValidationSchema,
};
