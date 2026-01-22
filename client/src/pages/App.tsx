import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import { Link } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteExpenseDocument,
  GetExpenseAmountsDocument,
  GetExpensesDocument,
  UpsertExpenseCategoryDocument,
  type DeleteExpenseMutation,
  type Expense,
  type ExpenseAmounts,
  type GetExpenseAmountsQuery,
  type GetExpensesQuery,
  type UpsertExpenseCategoryMutation,
} from '../graphql/__generated__/graphql';
import ExpenseCategoryFormDialog from '../components/ExpenseCategoryFormDialog';
import { AppRoutes } from '../routes/routes';
import ExpenseDeleteDialog from '../components/ExpenseDeleteDialog';
import ExpensesSummary from '../components/ExpensesSummary';
import { useDialog } from '../hooks/useDialog';

function App() {
  const { data: expensesData } = useQuery<GetExpensesQuery>(GetExpensesDocument, { fetchPolicy: 'network-only' });
  const { data: expenseAmountsData } = useQuery<GetExpenseAmountsQuery>(GetExpenseAmountsDocument, { fetchPolicy: 'network-only' });

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation>(DeleteExpenseDocument, { refetchQueries: [GetExpensesDocument] });
  const [upsertExpenseCategoryMutation] = useMutation<UpsertExpenseCategoryMutation>(UpsertExpenseCategoryDocument);

  const {
    isOpen: isExpenseDeleteDialogOpen,
    data: expenseToDeleteId,
    open: openExpenseDeleteDialog,
    close: closeExpenseDeleteDialog,
  } = useDialog<string>();

  const {
    isOpen: isExpenseCategoryFormDialogOpen,
    open: openExpenseCategoryFormDialog,
    close: closeExpenseCategoryFormDialog,
  } = useDialog();

  const expenses: Expense[] = expensesData?.expenses || [];
  const expenseAmounts: ExpenseAmounts | undefined = expenseAmountsData?.expenseAmounts || undefined;

  const deleteExpense = (id: string) => {
    deleteExpenseMutation({
      variables: {
        id,
      },
    });
  };

  const upsertExpenseCategory = (name: string) => {
    upsertExpenseCategoryMutation({
      variables: {
        name,
      },
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Expenses Tracker
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <ExpensesSummary
            expenseAmounts={expenseAmounts}
          />

          <ExpensesList
            expenses={expenses}
            openExpenseDeleteDialog={openExpenseDeleteDialog}
          />

          <ExpenseDeleteDialog
            open={isExpenseDeleteDialogOpen}
            expenseToDeleteId={expenseToDeleteId!}
            close={closeExpenseDeleteDialog}
            deleteExpense={deleteExpense}
          />

          <ExpenseCategoryFormDialog
            open={isExpenseCategoryFormDialogOpen}
            close={closeExpenseCategoryFormDialog}
            upsertExpenseCategory={upsertExpenseCategory}
          />

          <Stack direction="row" alignItems="center" spacing={2} marginTop="1rem">
            <Button
              variant="contained"
              component={Link}
              to={AppRoutes.CreateExpense}
            >
              Add Expense
            </Button>
            <Button
              variant="contained"
              onClick={openExpenseCategoryFormDialog}
            >
              Add Category
            </Button>
          </Stack>
        </Grid>
      </Container>
    </>
  )
}

export default App;
