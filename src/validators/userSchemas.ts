import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: 'Invalid Email Address',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long',
    }),
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters long'
    }).optional(),
});

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: 'Invalid Email Address',
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});