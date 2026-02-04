import React from 'react';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { formatAmount } from '../tools/formatAmount';

interface ExpenseCategoriesListProps {
  expenseCategories: ExpenseCategory[];
}

const ExpenseCategoriesList: React.FC<ExpenseCategoriesListProps> = ({ expenseCategories }) => {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseCategories.map((ec) => (
                <TableRow key={ec.id}>
                  <TableCell>{ec.name}</TableCell>
                  <TableCell>{formatAmount(ec.amount ?? 0)}</TableCell>
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
