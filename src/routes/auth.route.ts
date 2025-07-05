import { Hono } from 'hono';
import { registerSchema, loginSchema } from '../validators/userSchemas';
import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel';
import { Jwt } from 'hono/utils/jwt';
import 'dotenv/config'

export const authRouter = new Hono();

// /api/v1/auth/register
authRouter.post('/register',
    zValidator('json', registerSchema),
    async (c) => {

        // get the User data from body
        const { email, password, username } = await c.req.json();

        // validate the user data from body---- check with an email like "sdfgkjdf-com" should fail the register, and with "alerg@asdf.com" should pass. ✅ it does this.

        // verify that the email is not registered yet
        const existingUserEmail = await User.findOne({ email })
        const existingUserName = await User.findOne({ userName: username })
        if (existingUserEmail) {
            return c.json({ error: 'Email is already registered' }, 409)
        }

        if (existingUserName) {
            return c.json({ error: 'Username is already taken' }, 409)
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create a new user from the data
        const user = new User({
            userName: username,
            email,
            password: hashedPassword
        })
        await user.save()

        return c.json({
            message: 'Register successful',
            user: {
                id: user._id,
                email: user.email,
                userName: user.userName
            }
        });
    });

// /api/v1/auth/login
authRouter.post('/login',
    zValidator('json', loginSchema),
    async (c) => {

        // get the user data from body
        const { email, password } = await c.req.json()

        // verify that the user is in the data base
        const user = await User.findOne({ email })
        if (!user) {
            return c.json({ error: 'Invalid email or password' }, 401)
        }

        // verify that the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password as string)
        if (!passwordMatch) {
            return c.json({ error: 'Invalid email or password' }, 401)
        }

        // Generate JWT here
        const token = await Jwt.sign(
            {
                userId: user._id.toString(),
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days from now
            },
            process.env.JWT_SECRET!
        )

        return c.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                userName: user.userName
            }
        })
    });

export default authRouter;