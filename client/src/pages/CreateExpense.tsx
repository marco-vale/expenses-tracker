import { Container, Grid, Typography } from '@mui/material';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router';
import { CreateExpenseDocument, type CreateExpenseMutation } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';

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
