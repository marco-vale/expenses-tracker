import React from 'react';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';
import { CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';

type ExpenseCategoriesListProps = {
  expenseCategories: ExpenseCategory[];
  expenseCategoriesLoading: boolean;
  openExpenseCategoryFormDialog: (expenseCategory: ExpenseCategory) => void;
  deleteExpenseCategory: (id: string) => void;
}

const ExpenseCategoriesList: React.FC<ExpenseCategoriesListProps> = ({ expenseCategories, expenseCategoriesLoading, openExpenseCategoryFormDialog, deleteExpenseCategory }) => {
  if (expenseCategoriesLoading) {
    return (
      <Stack width="100%" marginTop="2rem" spacing={2} alignItems="center">
        <CircularProgress size={100} />
      </Stack>
    );
  }

  return (
    <Stack width="100%" marginTop="2rem" spacing={2}>
      {expenseCategories.length === 0 && (
        <Typography variant="h6" align="center" gutterBottom>
          No expense categories found.
        </Typography>
      )}

      {expenseCategories.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseCategories.map((ec) => (
                <TableRow key={ec.id}>
                  <TableCell>{ec.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color={(ec.amount ?? 0) < 0 ? 'error' : 'success'}>
                      {formatAmount(Math.abs(ec.amount ?? 0))}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      <Tooltip title="Edit category">
                        <span>
                          <IconButton size="small" color="primary" onClick={() => openExpenseCategoryFormDialog(ec)}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title={ec.deletable ? "Delete category" : "This category is in use and cannot be deleted"}>
                        <span>
                          <IconButton size="small" color="error" disabled={!ec.deletable} onClick={() => deleteExpenseCategory(ec.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
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

export default ExpenseCategoriesList;
