import { useState } from 'react'
import './App.css'
import type { Expense } from './types/Expense';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'e1', title: 'Toilet Paper', amount: 94.12, date: new Date(2020, 7, 14) },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    { id: 'e3', title: 'Car Insurance', amount: 294.67, date: new Date(2021, 2, 28) },
    { id: 'e4', title: 'New Desk (Wooden)', amount: 450, date: new Date(2021, 5, 12) },
  ]);

  return (
    <>
      <p>Expenses</p>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <h2>{expense.title}</h2>
          <p>Amount: ${expense.amount}</p>
          <p>Date: {expense.date.toDateString()}</p>
          {expense.category && (
            <p>Category: {expense.category.name}</p>
          )}
        </div>
      ))}
    </>
  )
}

export default App
