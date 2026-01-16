import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import ExpensesList from './components/ExpensesList';
import { Link } from 'react-router';
import { useMemo } from 'react';
import type { Expense, ExpensesQuery } from './gql/graphql';
import { useQuery } from '@apollo/client/react';
import { expensesQuery } from './graphql/expenses';

function App() {
  const { data, loading } = useQuery<ExpensesQuery>(expensesQuery);

  const expenses = useMemo<Expense[]>(() => {
    if (!data || !data.expenses || loading) {
      return [];
    }

    return data.expenses;
  }, [data, loading]);

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

          <ExpensesList expenses={expenses} />
        </Grid>
      </Container>
    </>
  )
}

export default App;
