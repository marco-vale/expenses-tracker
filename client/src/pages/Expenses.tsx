import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import { Link } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteAllDocument,
  DeleteExpenseDocument,
  GetExpensesDocument,
  GetExpensesSummaryDocument,
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
} from '../graphql/__generated__/graphql';
import { AppRoutes } from '../routes/routes';
import ExpenseDeleteDialog from '../components/ExpenseDeleteDialog';
import { useDialog } from '../hooks/useDialog';
import { useErrors } from '../hooks/useErrors';
import { useAuth } from '../hooks/useAuth';
import ExpensesSummary from '../components/ExpensesSummary';

const Expenses: React.FC = () => {
  const { userToken } = useAuth();
  const { onError } = useErrors();

  const { data: expensesData, loading: expensesLoading } = useQuery<GetExpensesQuery, GetExpensesQueryVariables>(
    GetExpensesDocument,
    { fetchPolicy: 'network-only' }
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

  const expenses: Expense[] = expensesData?.expenses ?? [];
  const expensesSummary: ExpensesSummaryType | null = expensesSummaryData?.expensesSummary ?? null;

  const deleteExpense = (id: string) => {
    deleteExpenseMutation({
      variables: {
        id,
      },
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Expenses
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Manage your expenses here.
      </Typography>

      <ExpensesSummary
        expensesSummary={expensesSummary}
      />

      {expensesLoading && (
        <Stack width="100%" marginTop="2rem" spacing={2} alignItems="center">
          <CircularProgress size={100} />
        </Stack>
      )}

      {!expensesLoading && (
        <ExpensesList
          expenses={expenses}
          openExpenseDeleteDialog={openExpenseDeleteDialog}
        />
      )}

      <Stack direction="row" spacing={2} marginTop="2rem">
        <Button
          variant="contained"
          component={Link}
          to={AppRoutes.CreateExpense}
        >
          Add Expense
        </Button>
        <Button
          variant="contained"
          component={Link}
          to={AppRoutes.ImportExpenses}
        >
          Import Expenses
        </Button>
        <Button
          color="error"
          variant="contained"
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
