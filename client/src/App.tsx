import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import ExpensesList from './components/ExpensesList';
import { Link } from 'react-router';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { getExpenses } from './graphql/getExpenses';
import type { Expense, GetExpensesQuery } from './graphql/__generated__/graphql';

function App() {
  const { data, loading } = useQuery<GetExpensesQuery>(getExpenses);

  const expenses = useMemo<Expense[]>(() => {
    if (!data?.expenses || loading) {
      return [];
    }

    return data.expenses;
  }, [data?.expenses, loading]);

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
