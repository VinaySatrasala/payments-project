import { Hono } from 'hono';
import { serveStatic } from "@hono/serve-static";

const app = new Hono();

// Serve static files from the `public` directory
app.use('/static/*', serveStatic({ root: './public' }));

// Route for the bank page
app.get('/bankz', (c) => {
  const token = c.req.query('token');
  const id = c.req.query('id');

  if (!token || !id) {
    return c.text('Missing token or id', 400);
  }

  console.log(`User with id ${id} is trying to access the bank page with token ${token}`);

  // Redirect to the static HTML file
  return c.redirect('/static/index.html');
});

export default app;
