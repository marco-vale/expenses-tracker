import express from 'express';
import cors from 'cors';
import { Expense } from './types/Expense.js';

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

app.get('/api/expenses', (_req, res) => {
  const expenses: Expense[] = [
    { id: 'e1', title: 'Toilet Paper', amount: 94.12, date: new Date(2020, 7, 14) },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    { id: 'e3', title: 'Car Insurance', amount: 294.67, date: new Date(2021, 2, 28) },
    { id: 'e4', title: 'New Desk (Wooden)', amount: 450, date: new Date(2021, 5, 12) },
  ];


  res.json(expenses);
});

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
});
