import { Button, Grid, Typography } from '@mui/material';
import { useMutation } from '@apollo/client/react';
import { Link, useNavigate } from 'react-router';
import { CreateExpenseDocument, type CreateExpenseMutation, type CreateExpenseMutationVariables } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { formatNumberString } from '../tools/formatNumberString';
import { useCallback } from 'react';
import { useErrors } from '../hooks/useErrors';

const CreateExpense: React.FC = () => {
  const { expenseCategories } = useExpenseCategories();
  const navigate = useNavigate();
  const { onError } = useErrors();

  const [createExpenseMutation] = useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(
    CreateExpenseDocument,
    { onError },
  );

  const onSubmit = useCallback((values: ExpenseFormValues) => {
    createExpenseMutation({
      variables: {
        expense: {
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
  }, [navigate, createExpenseMutation]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Add Expense
      </Typography>

      <Grid container spacing={2} justifyContent="center" direction="column">
        <ExpenseForm
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
            Add
          </Button>
        </div>
      </Grid>
    </>
  );
}

export default CreateExpense;
