import { Container, Grid, Typography } from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import { useMutation } from '@apollo/client/react';
import { CreateExpenseDocument, type CreateExpenseMutation } from './graphql/__generated__/graphql';
import type { ExpenseFormValues } from './types/types';
import { useNavigate } from 'react-router';
import { AppRoutes } from './routes/routes';

function CreateExpense() {
  const navigate = useNavigate();

  const [createExpenseMutation] = useMutation<CreateExpenseMutation>(CreateExpenseDocument);

  const onSubmit = (values: ExpenseFormValues) => {
    createExpenseMutation({
      variables: {
        expense: {
          title: values.title,
          amount: Number(values.amount),
          date: new Date(values.date).toISOString(),
          categoryId: values.categoryId || undefined,
        },
      },
    }).then(() => {
      navigate(AppRoutes.Home);
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Add Expense
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <ExpenseForm onSubmit={onSubmit} />
        </Grid>
      </Container>
    </>
  );
}

export default CreateExpense;
