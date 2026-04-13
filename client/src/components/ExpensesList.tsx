import { CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import React, { useState } from "react";
import { ExpenseType, type Expense } from '../graphql/__generated__/graphql';
import { formatDateString } from '../tools/formatDateString';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';
import { AppRoutes, buildRoute } from '../routes/routes';

type ExpensesListProps = {
  expenses: Expense[];
  expensesCount: number;
  expensesLoading: boolean;
  refetchExpenses: (page: number, rowsPerPage: number) => void;
  openExpenseDeleteDialog: (expenseId: string) => void;
};

const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  expensesCount,
  expensesLoading,
  refetchExpenses,
  openExpenseDeleteDialog,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
    refetchExpenses(page, rowsPerPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage: number = Number(event.target.value);

    setPage(0);
    setRowsPerPage(rowsPerPage);

    refetchExpenses(page, rowsPerPage);
  };

  if (expensesLoading) {
    return (
      <Stack width="100%" marginTop="2rem" spacing={2} alignItems="center">
        <CircularProgress size={100} />
      </Stack>
    );
  }

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
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color={e.type === ExpenseType.Expense ? 'error' : 'success'}>
                      {formatAmount(Math.abs(e.amount))}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDateString(e.date)}</TableCell>
                  <TableCell>{e.category ? e.category.name : '---'}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
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
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={expensesCount}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      )}
    </Stack>
  );
};

export default ExpensesList;
