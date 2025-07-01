import { password } from 'bun';
import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { email } from 'zod/v4';

export const authRouter = new Hono();

const registerSchema = z.object({
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

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: 'Invalid Email Address',
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

// /api/v1/auth/login
authRouter.post('/register', 
    zValidator('json', registerSchema), 
    async (c) => {

    // get the User data from body
    const {email, password, username} = await c.req.json();

    // validate the user data from body
    
    // verify that the email is not registered yet
    // hash the password
    // create a new user from the data

    // return c.json({message: 'Hello, Login!' });
    return c.json({email, password, username });
});

// /api/v1/auth/register
authRouter.post('/login', 
    zValidator('json', loginSchema), 
    async (c) => {

    // get the user data from body
    // validate the user data
    // verify that the user is in the data base
    // verify that the password is correct
    // create a JWT auth token
    // return JWT auth token

    return c.json({message: 'Hello,Register!' });
});

export default authRouter;