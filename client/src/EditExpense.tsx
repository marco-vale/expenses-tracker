import { useMutation, useQuery } from '@apollo/client/react';
import { GetExpenseDocument, UpdateExpenseDocument, type Expense, type GetExpenseQuery, type UpdateExpenseMutation } from './graphql/__generated__/graphql';
import { Container, Grid, Typography } from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import type { ExpenseFormValues } from './types/types';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppRoutes } from './routes/routes';

function EditExpense() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: expenseData, loading: expenseLoading } = useQuery<GetExpenseQuery>(
    GetExpenseDocument,
    {
      variables: {
        id,
      },
    },
  );

  const [updateExpenseMutation] = useMutation<UpdateExpenseMutation>(UpdateExpenseDocument);

  const onSubmit = (values: ExpenseFormValues) => {
    updateExpenseMutation({
      variables: {
        expense: {
          id: values.id,
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

  const expense = useMemo<Expense | undefined>(() => {
    if (!expenseData?.expense || expenseLoading) {
      return undefined;
    }

    return expenseData.expense;
  }, [expenseData?.expense, expenseLoading]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Edit Expense
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          {!expenseLoading && (
            <ExpenseForm expense={expense} onSubmit={onSubmit} />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default EditExpense;
