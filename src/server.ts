import { Hono } from 'hono';
import { authRouter } from './routes/auth.route';

const app = new Hono();

/*/ app.get("/hello", (c) => {
//     return c.json({ message : "Hello, World!" });
// });

// // returning are application/json
// app.get('/api/hello', (c) => {
//     return c.json({
//         ok: true,
//         message: 'Hello Hono',
//     })
// });

// // getting a path paramater, URL query value, and appending a Response header is written as follows.
// app.get('/post/:id', (c) => {
//     const page = c.req.query('page');
//     const id = c.req.param('id');
//     c.header('X-Message', 'Hi!');
//     return c.text(`You want to see ${page} of ${id}`);
// });

// // handling also POST and DELETE Methods
// app.post('/post', (c) => c.text('Created!', 201));
// app.delete('/post/:id', (c) => c.text(`${c.req.param('id')} is deleted`));

/* return a custom HTML
// const View = () => {
//     return (
//         <html>
//             <body>
//                 <h1>Hello Hono!</h1>
//             </body>
//         </html>
//     )
// }

// app.get('/page', (c) => {
//     return c.html(<View />);
// });
*/

app.route('/api/v1/auth', authRouter);


export default {
    port:3000,
    fetch: app.fetch,
}