import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

// allow the Vite dev server by default
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);

app.get('/health', (_req, res) => {
  res.json({ ok: true })
});

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
});
