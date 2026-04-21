import { Button, Stack, Typography } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import { Link } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteExpenseDocument,
  GetExpensesDocument,
  GetExpensesSummaryDocument,
  OrderDirection,
  type DeleteExpenseMutation,
  type DeleteExpenseMutationVariables,
  type Expense,
  type ExpensesFilters,
  type ExpensesSummary as ExpensesSummaryType,
  type GetExpensesQuery,
  type GetExpensesQueryVariables,
  type GetExpensesSummaryQuery,
  type GetExpensesSummaryQueryVariables,
} from '../graphql/__generated__/graphql';
import { AppRoutes } from '../routes/routes';
import DeleteDialog from '../components/DeleteDialog';
import { useDialog } from '../hooks/useDialog';
import { useErrors } from '../hooks/useErrors';
import ExpensesSummary from '../components/ExpensesSummary';
import { Add, FileUpload } from '@mui/icons-material';
import { useTable } from '../hooks/useTable';
import { useExpenseCategories } from '../hooks/useExpenseCategories';

const Expenses: React.FC = () => {
  const { expenseCategories } = useExpenseCategories();
  const expensesTable = useTable<ExpensesFilters>({
    orderBy: 'date',
    orderDirection: OrderDirection.Desc,
    rowsPerPage: 10,
  });
  const expenseDeleteDialog = useDialog<string>();
  const { onError } = useErrors();

  const { data: expensesData, loading: expensesLoading } = useQuery<GetExpensesQuery, GetExpensesQueryVariables>(
    GetExpensesDocument,
    {
      variables: {
        filters: expensesTable.filters,
        options: {
          page: expensesTable.page,
          rowsPerPage: expensesTable.rowsPerPage,
          orderBy: expensesTable.orderBy,
          orderDirection: expensesTable.orderDirection,
        },
      },
      fetchPolicy: 'network-only',
    }
  );

  const { data: expensesSummaryData } = useQuery<GetExpensesSummaryQuery, GetExpensesSummaryQueryVariables>(
    GetExpensesSummaryDocument,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(
    DeleteExpenseDocument,
    { refetchQueries: [GetExpensesDocument], onError },
  );

  const expenses: Expense[] = expensesData?.expenses?.expenses ?? [];
  const expensesCount: number = expensesData?.expenses?.count ?? 0;
  const expensesSummary: ExpensesSummaryType | null = expensesSummaryData?.expensesSummary ?? null;

  const deleteExpense = (id?: string) => {
    deleteExpenseMutation({
      variables: {
        id: id ?? '',
      },
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Expenses
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Manage your expenses here.
      </Typography>

      <ExpensesSummary
        expensesSummary={expensesSummary}
      />

      <ExpensesList
        expenses={expenses}
        expensesCount={expensesCount}
        expensesLoading={expensesLoading}
        expenseCategories={expenseCategories}
        expensesTable={expensesTable}
        openExpenseDeleteDialog={expenseDeleteDialog.open}
      />

      <Stack direction="row" spacing={2} marginTop="2rem">
        <Button
          variant="outlined"
          startIcon={<Add />}
          component={Link}
          to={AppRoutes.CreateExpense}
        >
          Add Expense
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileUpload />}
          component={Link}
          to={AppRoutes.ImportExpenses}
        >
          Import Expenses
        </Button>
      </Stack>

      <DeleteDialog
        deleteDialog={expenseDeleteDialog}
        deleteFunc={deleteExpense}
      />
    </>
  )
}

export default Expenses;
