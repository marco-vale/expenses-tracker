import React from 'react';
import { OrderDirection, type ExpenseCategoriesFilters, type ExpenseCategory } from '../graphql/__generated__/graphql';
import { CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography } from '@mui/material';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';
import type { UseTableResult } from '../types/types';
import ExpenseCategoriesListFilters from './ExpenseCategoriesListFilters';

type ExpenseCategoriesListProps = {
  expenseCategories: ExpenseCategory[];
  expenseCategoriesCount: number;
  expenseCategoriesLoading: boolean;
  expenseCategoriesTable: UseTableResult<ExpenseCategoriesFilters>;
  openExpenseCategoryFormDialog: (expenseCategory: ExpenseCategory) => void;
  deleteExpenseCategory: (id: string) => void;
}

const ExpenseCategoriesList: React.FC<ExpenseCategoriesListProps> = ({
  expenseCategories,
  expenseCategoriesCount,
  expenseCategoriesLoading,
  expenseCategoriesTable,
  openExpenseCategoryFormDialog,
  deleteExpenseCategory,
}) => {
  const {
    filters,
    orderBy,
    orderDirection,
    page,
    rowsPerPage,
    handleFiltersApply,
    handleFiltersClear,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  } = expenseCategoriesTable;

  if (expenseCategoriesLoading) {
    return (
      <Stack width="100%" marginTop="2rem" spacing={2} alignItems="center">
        <CircularProgress size={100} />
      </Stack>
    );
  }

  return (
    <Stack width="100%" marginTop="2rem">
      <ExpenseCategoriesListFilters
        expenseCategoriesFilters={filters}
        handleFiltersApply={handleFiltersApply}
        handleFiltersClear={handleFiltersClear}
      />

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
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? orderDirection : OrderDirection.Asc}
                    onClick={() => handleSort('name', orderBy === 'name' && orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
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
