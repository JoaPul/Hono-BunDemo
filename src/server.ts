import { Hono } from 'hono';
import { userRoutes } from './routes/userRoutes';
import './utils/db' // ensure MongoDB is connected before serving
// import { authRouter } from './routes/auth.route' // if you're using auth too

const app = new Hono();

app.route('/api/v1/users', userRoutes);
// app.route('/api/v1/auth', authRouter)

export default {
  port: 3000,
  fetch: app.fetch,
};
