import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from "react";
import type { Expense } from '../graphql/__generated__/graphql';

export type ExpensesListProps = {
  expenses: Expense[];
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }: ExpensesListProps) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}€</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.category ? expense.category.name : '---'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesList;
