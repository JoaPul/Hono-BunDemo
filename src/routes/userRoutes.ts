import { Hono } from 'hono'
import { User } from '../models/userModel'

export const userRoutes = new Hono()

userRoutes.get('/', async (c) => {
  const users = await User.find().populate('shoes').populate('runs')
  return c.json(users)
})

userRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const user = new User(body)
    await user.save()
    return c.json(user, 201)
  } catch (err) {
    console.error(err)
    return c.json({ error: 'User creation failed' }, 500)
  }
})
