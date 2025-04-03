import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email().nonempty('Email is required'),
  password: z.string().nonempty('Password is required').min(6)
});

export const loginSchema = z.object({
  email: z.string().email().nonempty('Password is required'),
  password: z.string().nonempty('Password is required').min(6)
});
