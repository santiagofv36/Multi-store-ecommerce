// Sign in

import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().trim().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

export type TAuthSchemaForm = z.infer<typeof AuthSchema>;

export const createPasswordSchema = AuthSchema.extend({
  confirmPassword: z.string().trim(),
})
  .refine(
    ({ password }) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      ),
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      path: ['password'],
    }
  )
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export type TCreatePasswordSchemaForm = z.infer<typeof createPasswordSchema>;
