import { Container, Grid, Typography } from '@mui/material';
import ExpensesForm from './components/ExpensesForm';
import { useMutation } from '@apollo/client/react';
import type { CreateExpenseMutation, ExpenseInput } from './graphql/__generated__/graphql';
import { createExpenseGql } from './graphql/createExpenseGql';

function CreateExpense() {
  const [createExpenseMutation] = useMutation<CreateExpenseMutation>(createExpenseGql);

  const createExpense = (expense: ExpenseInput) => {
    createExpenseMutation({
      variables: {
        expense,
      },
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        New Expense
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <ExpensesForm createExpense={createExpense} />
        </Grid>
      </Container>
    </>
  );
}

export default CreateExpense;
