import { Container, Grid, Typography } from '@mui/material';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router';
import { CreateExpenseDocument, type CreateExpenseMutation } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenseCategories } from '../hooks/useExpenseCategories';

const CreateExpense: React.FC = () => {
  const { expenseCategories } = useExpenseCategories(false);
  const [createExpenseMutation] = useMutation<CreateExpenseMutation>(CreateExpenseDocument);

  const navigate = useNavigate();

  const onSubmit = (values: ExpenseFormValues) => {
    createExpenseMutation({
      variables: {
        expense: {
          description: values.description,
          amount: Number(values.amount),
          date: new Date(values.date).toISOString(),
          categoryId: values.categoryId || undefined,
        },
      },
    }).then(() => {
      navigate(AppRoutes.Expenses);
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Add Expense
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <ExpenseForm
            expenseCategories={expenseCategories}
            onSubmit={onSubmit}
          />
        </Grid>
      </Container>
    </>
  );
}

export default CreateExpense;
