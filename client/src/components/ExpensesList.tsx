import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React from "react";
import type { Expense } from '../graphql/__generated__/graphql';
import { formatDate } from '../tools/formatDate';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';
import { AppRoutes, buildRoute } from '../routes/routes';

type ExpensesListProps = {
  expenses: Expense[];
  openExpenseDeleteDialog: (expenseId: string) => void;
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses, openExpenseDeleteDialog }) => {
  return (
    <Stack width="100%" marginTop="2rem" spacing={2}>
      {expenses.length === 0 && (
        <Typography variant="h6" align="center" gutterBottom>
          No expenses found.
        </Typography>
      )}

      {expenses.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.description}</TableCell>
                  <TableCell>{formatAmount(e.amount)}</TableCell>
                  <TableCell>{formatDate(e.date)}</TableCell>
                  <TableCell>{e.category ? e.category.name : '---'}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit expense">
                      <span>
                        <IconButton size="small" color="primary" href={buildRoute(AppRoutes.EditExpense, e.id)}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Delete expense">
                      <IconButton size="small" color="error" onClick={() => openExpenseDeleteDialog(e.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default ExpensesList;
