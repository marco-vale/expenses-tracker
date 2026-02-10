import { useMutation, useQuery } from '@apollo/client/react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { GetExpenseDocument, UpdateExpenseDocument, type Expense, type GetExpenseQuery, type UpdateExpenseMutation } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { formatNumberString } from '../tools/formatNumberString';

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: expenseData, loading: expenseLoading } = useQuery<GetExpenseQuery>(
    GetExpenseDocument,
    {
      variables: {
        id,
      },
    },
  );

  const { expenseCategories } = useExpenseCategories(false);
  const [updateExpenseMutation] = useMutation<UpdateExpenseMutation>(UpdateExpenseDocument);

  const navigate = useNavigate();

  const expense = useMemo<Expense | undefined>(() => {
    if (!expenseData?.expense || expenseLoading) {
      return undefined;
    }

    return expenseData.expense;
  }, [expenseData?.expense, expenseLoading]);

  const onSubmit = useCallback((values: ExpenseFormValues) => {
    updateExpenseMutation({
      variables: {
        expense: {
          id: expense?.id ?? '',
          description: values.description,
          amount: Number(formatNumberString(values.amount)),
          date: new Date(values.date).toISOString(),
          categoryId: values.categoryId || undefined,
        },
      },
    }).then(() => {
      navigate(AppRoutes.Expenses);
    });
  }, [expense?.id, navigate, updateExpenseMutation]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Edit Expense
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" direction="column">
          {!expenseLoading && (
            <>
              <ExpenseForm
                expense={expense}
                expenseCategories={expenseCategories}
                onSubmit={onSubmit}
              />

              <div>
                <Button
                  type="button"
                  variant="outlined"
                  style={{ marginRight: '1rem' }}
                  component={Link}
                  to={AppRoutes.Expenses}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  form="expenseForm"
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default EditExpense;
