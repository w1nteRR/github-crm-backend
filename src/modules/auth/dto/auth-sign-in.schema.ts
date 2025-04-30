import { z } from 'zod';

export const authSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthSignInDto = z.infer<typeof authSignInSchema>;
