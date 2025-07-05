import { Hono } from 'hono';
import { userRoutes } from './routes/userRoutes';
import './utils/db';
import { authRouter } from './routes/auth.route';
const app = new Hono();

app.route('/api/v1/users', userRoutes);
app.route('/api/v1/auth', authRouter);

export default {
  port: 3000,
  fetch: app.fetch,
};
