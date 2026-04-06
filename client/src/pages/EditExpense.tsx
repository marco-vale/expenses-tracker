import { useMutation, useQuery } from '@apollo/client/react';
import { Button, Grid, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { GetExpenseDocument, UpdateExpenseDocument, type Expense, type GetExpenseQuery, type GetExpenseQueryVariables, type UpdateExpenseMutation, type UpdateExpenseMutationVariables } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { formatNumberString } from '../tools/formatNumberString';
import { useErrors } from '../hooks/useErrors';

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { expenseCategories } = useExpenseCategories(false);
  const navigate = useNavigate();
  const { onError } = useErrors();

  const { data: expenseData, loading: expenseLoading } = useQuery<GetExpenseQuery, GetExpenseQueryVariables>(
    GetExpenseDocument,
    {
      variables: {
        id: id ?? '',
      },
      fetchPolicy: 'network-only',
    },
  );

  const [updateExpenseMutation] = useMutation<UpdateExpenseMutation, UpdateExpenseMutationVariables>(
    UpdateExpenseDocument,
    { onError },
  );

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
          type: values.type,
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
    </>
  );
};

export default EditExpense;
