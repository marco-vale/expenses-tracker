import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import ExpensesList from './components/ExpensesList';
import { Link } from 'react-router';
import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { getExpensesGql } from './graphql/getExpensesGql';
import type {
  DeleteExpenseMutation,
  Expense,
  GetExpensesQuery,
} from './graphql/__generated__/graphql';
import { deleteExpenseGql } from './graphql/deleteExpenseGql';

function App() {
  const { data: expensesData, loading: expensesLoading } = useQuery<GetExpensesQuery>(
    getExpensesGql,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation>(
    deleteExpenseGql,
    {
      refetchQueries: [getExpensesGql],
    },
  );

  const deleteExpense = (id: string) => {
    deleteExpenseMutation({
      variables: {
        id,
      },
    });
  };

  const expenses = useMemo<Expense[]>(() => {
    if (!expensesData?.expenses || expensesLoading) {
      return [];
    }

    return expensesData.expenses;
  }, [expensesData?.expenses, expensesLoading]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Expenses Tracker
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Paper style={{ padding: '1rem', marginTop: '1rem', width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button
                color="primary"
                variant="contained"
                style={{ margin: '1rem' }}
                component={Link}
                to="/create"
              >
                New Expense
              </Button>
            </Stack>
          </Paper>

          <ExpensesList
            expenses={expenses}
            deleteExpense={deleteExpense}
          />
        </Grid>
      </Container>
    </>
  )
}

export default App;
