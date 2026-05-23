import * as z from 'zod';

export const profileUpdateSchema = z.object({
  username: z.string().trim().min(2, 'Username must be at least 2 characters'),
});

export type profileUpdate = z.infer<typeof profileUpdateSchema>;
