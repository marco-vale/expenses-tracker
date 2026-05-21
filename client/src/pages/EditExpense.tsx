import { useMutation, useQuery } from '@apollo/client/react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { GetExpenseDocument, UpdateExpenseDocument, type Expense, type GetExpenseQuery, type GetExpenseQueryVariables, type UpdateExpenseMutation, type UpdateExpenseMutationVariables } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { useErrors } from '../hooks/useErrors';
import { ArrowBack, Save } from '@mui/icons-material';
import { parseNumberString } from '../tools/tools';

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { expenseCategories } = useExpenseCategories();
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
          amount: parseNumberString(values.amount),
          date: values.date,
          categoryId: values.categoryId || undefined,
        },
      },
    }).then(() => {
      navigate(AppRoutes.Expenses);
    });
  }, [expense?.id, navigate, updateExpenseMutation]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
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

            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                startIcon={<ArrowBack fontSize="small" />}
                sx={{ textTransform: 'none' }}
                component={Link}
                to={AppRoutes.Expenses}
              >
                Back
              </Button>
              <Button
                type="submit"
                form="expenseForm"
                variant="outlined"
                startIcon={<Save />}
              >
                Save
              </Button>
            </Stack>
          </>
        )}
      </Grid>
    </>
  );
};

export default EditExpense;
