import { z } from 'zod';

export const authSignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type AuthSignUpDto = z.infer<typeof authSignUpSchema>;
