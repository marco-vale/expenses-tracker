import { CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography } from '@mui/material';
import React, { useState } from "react";
import { ExpenseType, OrderDirection, type Expense, type QueryOptions } from '../graphql/__generated__/graphql';
import { formatDateString } from '../tools/formatDateString';
import { formatAmount } from '../tools/formatAmount';
import { Delete, Edit } from '@mui/icons-material';
import { AppRoutes, buildRoute } from '../routes/routes';
import { Link } from 'react-router';

type ExpensesListProps = {
  expenses: Expense[];
  expensesCount: number;
  expensesLoading: boolean;
  refetchExpenses: (options: QueryOptions) => void;
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
  const [orderBy, setOrderBy] = useState<string>('date');
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc);

  const handleSort = (orderBy: string, orderDirection: OrderDirection) => {
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);

    refetchExpenses({
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    });
  }

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);

    refetchExpenses({
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage: number = Number(event.target.value);

    setPage(0);
    setRowsPerPage(rowsPerPage);

    refetchExpenses({
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    });
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
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No expenses found.
          </Typography>
        </Paper>
      )}

      {expenses.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? orderDirection : OrderDirection.Asc}
                    onClick={() => handleSort('description', orderBy === 'description' && orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? orderDirection : OrderDirection.Asc}
                    onClick={() => handleSort('amount', orderBy === 'amount' && orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? orderDirection : OrderDirection.Asc}
                    onClick={() => handleSort('date', orderBy === 'date' && orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
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
                        <IconButton
                          size="small"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                          component={Link}
                          to={buildRoute(AppRoutes.EditExpense, e.id)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete expense">
                        <IconButton
                          size="small"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                          onClick={() => openExpenseDeleteDialog(e.id)}
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
