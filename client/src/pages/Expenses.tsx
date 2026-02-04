import { Button, Container, Stack, Typography } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import { Link } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteExpenseDocument,
  GetExpensesDocument,
  type DeleteExpenseMutation,
  type Expense,
  type GetExpensesQuery,
} from '../graphql/__generated__/graphql';
import { AppRoutes } from '../routes/routes';
import ExpenseDeleteDialog from '../components/ExpenseDeleteDialog';
import ExpensesSummary from '../components/ExpensesSummary';
import { useDialog } from '../hooks/useDialog';
import { useExpenseCategories } from '../hooks/useExpenseCategories';

const Expenses: React.FC = () => {
  const { expenseCategories } = useExpenseCategories();
  const { data: expensesData } = useQuery<GetExpensesQuery>(GetExpensesDocument, { fetchPolicy: 'network-only' });

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation>(
    DeleteExpenseDocument,
    { refetchQueries: [GetExpensesDocument] },
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
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
          Expenses
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Manage your expenses here.
        </Typography>

        <ExpensesSummary
          expenseCategories={expenseCategories}
        />

        <ExpensesList
          expenses={expenses}
          openExpenseDeleteDialog={openExpenseDeleteDialog}
        />

        <Stack direction="row" spacing={2} marginTop="2rem">
          <Button
            variant="contained"
            component={Link}
            to={AppRoutes.CreateExpense}
          >
            Add Expense
          </Button>
        </Stack>
      </Container>

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
