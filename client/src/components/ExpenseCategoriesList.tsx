import React, { useState } from 'react';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';
import { CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';

type ExpenseCategoriesListProps = {
  expenseCategories: ExpenseCategory[];
  expenseCategoriesCount: number;
  expenseCategoriesLoading: boolean;
  refetchExpenseCategories: (page: number, rowsPerPage: number) => void;
  openExpenseCategoryFormDialog: (expenseCategory: ExpenseCategory) => void;
  deleteExpenseCategory: (id: string) => void;
}

const ExpenseCategoriesList: React.FC<ExpenseCategoriesListProps> = ({
  expenseCategories,
  expenseCategoriesCount,
  expenseCategoriesLoading,
  refetchExpenseCategories,
  openExpenseCategoryFormDialog,
  deleteExpenseCategory,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
    refetchExpenseCategories(page, rowsPerPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage: number = Number(event.target.value);

    setPage(0);
    setRowsPerPage(rowsPerPage);

    refetchExpenseCategories(page, rowsPerPage);
  };

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
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" align="center" gutterBottom>
            No categories found.
          </Typography>
        </Paper>
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
                        <IconButton
                          size="small"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                          onClick={() => openExpenseCategoryFormDialog(ec)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={ec.deletable ? "Delete category" : "This category is in use and cannot be deleted"}>
                        <IconButton
                          size="small"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                          disabled={!ec.deletable}
                          onClick={() => deleteExpenseCategory(ec.id)}
                        >
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
            count={expenseCategoriesCount}
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

export default ExpenseCategoriesList;
