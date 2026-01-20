import { useMutation, useQuery } from '@apollo/client/react';
import type { Expense, GetExpenseQuery, UpdateExpenseMutation } from './graphql/__generated__/graphql';
import { updateExpenseGql } from './graphql/updateExpenseGql';
import { Container, Grid, Typography } from '@mui/material';
import ExpensesForm from './components/ExpensesForm';
import type { ExpenseFormValues } from './types/types';
import { getExpenseGql } from './graphql/getExpenseGql';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppRoutes } from './routes/routes';

function EditExpense() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: expenseData, loading: expenseLoading } = useQuery<GetExpenseQuery>(
    getExpenseGql,
    {
      variables: {
        id,
      },
    },
  );

  const [updateExpenseMutation] = useMutation<UpdateExpenseMutation>(updateExpenseGql);

  const onSubmit = (values: ExpenseFormValues) => {
    updateExpenseMutation({
      variables: {
        expense: {
          id: values.id,
          title: values.title,
          amount: Number(values.amount),
          date: new Date(values.date).toISOString(),
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
            <ExpensesForm expense={expense} onSubmit={onSubmit} />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default EditExpense;
