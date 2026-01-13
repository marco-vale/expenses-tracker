import type { Expense } from '../types/Expense';

const BASE_URL: string = 'http://localhost:3001';

export const fetchExpenses = (): Promise<Expense[]> => {
  return fetch(BASE_URL + '/api/expenses')
    .then((res) => res.json())
    .then((data) => data.map((expense: Expense) => ({
      ...expense,
      date: new Date(expense.date),
    })));
};
