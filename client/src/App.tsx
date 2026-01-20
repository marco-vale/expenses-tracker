import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import ExpensesList from './components/ExpensesList';
import { Link } from 'react-router';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { getExpensesGql } from './graphql/getExpensesGql';
import type {
  DeleteExpenseMutation,
  Expense,
  GetExpensesQuery,
  UpsertExpenseCategoryMutation,
} from './graphql/__generated__/graphql';
import { deleteExpenseGql } from './graphql/deleteExpenseGql';
import ExpenseCategoryDialog from './components/ExpenseCategoryDialog';
import { AppRoutes } from './routes/routes';
import { upsertExpenseCategoryGql } from './graphql/upsertExpenseCategoryGql';
import type { ExpenseCategoryFormValues } from './types/types';

function App() {
  const { data: expensesData, loading: expensesLoading } = useQuery<GetExpensesQuery>(getExpensesGql, { fetchPolicy: 'network-only' });

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation>(deleteExpenseGql, { refetchQueries: [getExpensesGql] });
  const deleteExpense = (id: string) => {
    deleteExpenseMutation({
      variables: {
        id,
      },
    });
  };

  const [upsertExpenseCategoryMutation] = useMutation<UpsertExpenseCategoryMutation>(upsertExpenseCategoryGql);
  const onExpenseCategoryDialogSubmit = (values: ExpenseCategoryFormValues) => {
    upsertExpenseCategoryMutation({
      variables: {
        name: values.name,
      },
    }).then(() => {
      setExpenseCategoryDialogOpen(false);
    });
  };

  const expenses = useMemo<Expense[]>(() => {
    if (!expensesData?.expenses || expensesLoading) {
      return [];
    }

    return expensesData.expenses;
  }, [expensesData?.expenses, expensesLoading]);

  const [expenseCategoryDialogOpen, setExpenseCategoryDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Expenses Tracker
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2} style={{ marginTop: '1rem' }}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={AppRoutes.CreateExpense}
            >
              Add Expense
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setExpenseCategoryDialogOpen(true)}
            >
              Add Category
            </Button>
          </Stack>

          <ExpensesList
            expenses={expenses}
            deleteExpense={deleteExpense}
          />

          <ExpenseCategoryDialog
            open={expenseCategoryDialogOpen}
            close={() => setExpenseCategoryDialogOpen(false)}
            onSubmit={onExpenseCategoryDialogSubmit}
          />
        </Grid>
      </Container>
    </>
  )
}

export default App;
