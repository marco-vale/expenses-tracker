import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from "react";
import type { Expense } from '../graphql/__generated__/graphql';
import { formatDate } from '../tools/formatDate';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';

type ExpensesListProps = {
  expenses: Expense[];
  openExpenseDeleteDialog: (expenseId: string) => void;
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses, openExpenseDeleteDialog }) => {
  return (
    <>
      {expenses.length === 0 && (
        <Typography variant="h6" align="center" gutterBottom>
          No expenses found.
        </Typography>
      )}

      {expenses.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{formatAmount(e.amount)}</TableCell>
                  <TableCell>{formatDate(e.date)}</TableCell>
                  <TableCell>{e.category ? e.category.name : '---'}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" href={`/edit/${e.id}`}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => openExpenseDeleteDialog(e.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ExpensesList;
