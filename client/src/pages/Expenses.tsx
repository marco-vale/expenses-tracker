import { Button, Stack, Typography } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import { Link } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteAllDocument,
  DeleteExpenseDocument,
  GetExpensesDocument,
  GetExpensesSummaryDocument,
  OrderDirection,
  type DeleteAllMutation,
  type DeleteAllMutationVariables,
  type DeleteExpenseMutation,
  type DeleteExpenseMutationVariables,
  type Expense,
  type ExpensesSummary as ExpensesSummaryType,
  type GetExpensesQuery,
  type GetExpensesQueryVariables,
  type GetExpensesSummaryQuery,
  type GetExpensesSummaryQueryVariables,
  type QueryOptions,
} from '../graphql/__generated__/graphql';
import { AppRoutes } from '../routes/routes';
import ExpenseDeleteDialog from '../components/ExpenseDeleteDialog';
import { useDialog } from '../hooks/useDialog';
import { useErrors } from '../hooks/useErrors';
import { useAuth } from '../hooks/useAuth';
import ExpensesSummary from '../components/ExpensesSummary';
import { useCallback } from 'react';
import { Add, Delete, FileUpload } from '@mui/icons-material';

const Expenses: React.FC = () => {
  const { userToken } = useAuth();
  const { onError } = useErrors();

  const { data: expensesData, loading: expensesLoading, refetch: refetchExpensesQuery } = useQuery<GetExpensesQuery, GetExpensesQueryVariables>(
    GetExpensesDocument,
    {
      variables: {
        options: {
          page: 0,
          rowsPerPage: 10,
          orderBy: 'date',
          orderDirection: OrderDirection.Desc,
        },
      },
      fetchPolicy: 'network-only',
    }
  );

  const { data: expensesSummaryData } = useQuery<GetExpensesSummaryQuery, GetExpensesSummaryQueryVariables>(
    GetExpensesSummaryDocument,
    {
      variables: {
        userToken: userToken ?? '',
      },
      fetchPolicy: 'network-only',
    },
  );

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(
    DeleteExpenseDocument,
    { refetchQueries: [GetExpensesDocument], onError },
  );

  const [deleteAllMutation] = useMutation<DeleteAllMutation, DeleteAllMutationVariables>(
    DeleteAllDocument,
    { refetchQueries: [GetExpensesDocument], onError },
  );

  const {
    isOpen: isExpenseDeleteDialogOpen,
    data: expenseToDeleteId,
    open: openExpenseDeleteDialog,
    close: closeExpenseDeleteDialog,
  } = useDialog<string>();

  const expenses: Expense[] = expensesData?.expenses?.expenses ?? [];
  const expensesCount: number = expensesData?.expenses?.count ?? 0;
  const expensesSummary: ExpensesSummaryType | null = expensesSummaryData?.expensesSummary ?? null;

  const refetchExpenses = useCallback((options: QueryOptions) => {
    refetchExpensesQuery({ options });
  }, [refetchExpensesQuery]);

  const deleteExpense = (id: string) => {
    deleteExpenseMutation({
      variables: {
        id,
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
        refetchExpenses={refetchExpenses}
        openExpenseDeleteDialog={openExpenseDeleteDialog}
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
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => deleteAllMutation()}
        >
          Delete All
        </Button>
      </Stack>

      <ExpenseDeleteDialog
        open={isExpenseDeleteDialogOpen}
        expenseToDeleteId={expenseToDeleteId!}
        close={closeExpenseDeleteDialog}
        deleteExpense={deleteExpense}
      />
    </>
  )
}

export default Expenses;
