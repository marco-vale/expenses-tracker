import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import { Link } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteAllDocument,
  DeleteExpenseDocument,
  GetExpensesDocument,
  type DeleteAllMutation,
  type DeleteAllMutationVariables,
  type DeleteExpenseMutation,
  type DeleteExpenseMutationVariables,
  type Expense,
  type GetExpensesQuery,
} from '../graphql/__generated__/graphql';
import { AppRoutes } from '../routes/routes';
import ExpenseDeleteDialog from '../components/ExpenseDeleteDialog';
import ExpensesSummary from '../components/ExpensesSummary';
import { useDialog } from '../hooks/useDialog';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { useErrors } from '../hooks/useErrors';

const Expenses: React.FC = () => {
  const { expenseCategories } = useExpenseCategories();
  const { onError } = useErrors();

  const { data: expensesData, loading: expensesLoading } = useQuery<GetExpensesQuery>(
    GetExpensesDocument,
    { fetchPolicy: 'network-only' }
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
        expenseCategories={expenseCategories}
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
