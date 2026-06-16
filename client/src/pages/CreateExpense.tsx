import { Button, Grid, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client/react';
import { Link, useNavigate } from 'react-router';
import { CreateExpenseDocument, MeDocument, type CreateExpenseMutation, type CreateExpenseMutationVariables } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { useCallback } from 'react';
import { useErrors } from '../hooks/useErrors';
import { Add, ArrowBack } from '@mui/icons-material';
import { parseNumberString } from '../tools/tools';

const CreateExpense: React.FC = () => {
  const { expenseCategories } = useExpenseCategories();
  const navigate = useNavigate();
  const { onError } = useErrors();

  const [createExpenseMutation] = useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(
    CreateExpenseDocument,
    { refetchQueries: [MeDocument], onError },
  );

  const onSubmit = useCallback((values: ExpenseFormValues) => {
    createExpenseMutation({
      variables: {
        expense: {
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
  }, [navigate, createExpenseMutation]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Add expense
      </Typography>

      <Grid container spacing={2} justifyContent="center" direction="column">
        <ExpenseForm
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
            startIcon={<Add />}
          >
            Add
          </Button>
        </Stack>
      </Grid>
    </>
  );
}

export default CreateExpense;
