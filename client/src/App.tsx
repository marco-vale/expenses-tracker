import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import ExpensesList from './components/ExpensesList';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DeleteExpenseDocument,
  GetExpenseAmountsDocument,
  GetExpensesDocument,
  UpsertExpenseCategoryDocument,
  type DeleteExpenseMutation,
  type Expense,
  type ExpenseAmounts,
  type GetExpenseAmountsQuery,
  type GetExpensesQuery,
  type UpsertExpenseCategoryMutation,
} from './graphql/__generated__/graphql';
import ExpenseCategoryDialog from './components/ExpenseCategoryDialog';
import { AppRoutes } from './routes/routes';
import type { ExpenseCategoryFormValues } from './types/types';
import { formatAmount } from './tools/formatAmount';

function App() {
  const { data: expensesData } = useQuery<GetExpensesQuery>(GetExpensesDocument, { fetchPolicy: 'network-only' });
  const { data: expenseAmountsData } = useQuery<GetExpenseAmountsQuery>(GetExpenseAmountsDocument, { fetchPolicy: 'network-only' });

  const expenses: Expense[] = expensesData?.expenses || [];
  const expenseAmounts: ExpenseAmounts | undefined = expenseAmountsData?.expenseAmounts || undefined;

  useEffect(() => {
    console.log(expenseAmountsData);
  }, [expenseAmountsData]);

  const [deleteExpenseMutation] = useMutation<DeleteExpenseMutation>(DeleteExpenseDocument, { refetchQueries: [GetExpensesDocument] });
  const deleteExpense = (id: string) => {
    deleteExpenseMutation({
      variables: {
        id,
      },
    });
  };

  const [upsertExpenseCategoryMutation] = useMutation<UpsertExpenseCategoryMutation>(UpsertExpenseCategoryDocument);
  const onExpenseCategoryDialogSubmit = (values: ExpenseCategoryFormValues) => {
    upsertExpenseCategoryMutation({
      variables: {
        name: values.name,
      },
    }).then(() => {
      setExpenseCategoryDialogOpen(false);
    });
  };

  const [expenseCategoryDialogOpen, setExpenseCategoryDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Expenses Tracker
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Stack width="100%" direction="row" spacing={2} marginTop="1rem">
            <Card style={{ flexGrow: 1, padding: '1rem' }}>
              <Typography variant="h6" align="center">
                Total Expenses: {formatAmount(expenseAmounts?.amount || 0)}
              </Typography>
            </Card>
            {(expenseAmounts?.categories || []).map((eca) => (
              <Card key={eca.category.id} style={{ flexGrow: 1, padding: '1rem' }}>
                <Typography variant="h6" align="center">
                  {eca.category.name}: {formatAmount(eca.amount)}
                </Typography>
              </Card>
            ))}
          </Stack>

          <ExpensesList
            expenses={expenses}
            deleteExpense={deleteExpense}
          />

          <ExpenseCategoryDialog
            open={expenseCategoryDialogOpen}
            close={() => setExpenseCategoryDialogOpen(false)}
            onSubmit={onExpenseCategoryDialogSubmit}
          />

          <Stack direction="row" alignItems="center" spacing={2} marginTop="1rem">
            <Button
              variant="contained"
              component={Link}
              to={AppRoutes.CreateExpense}
            >
              Add Expense
            </Button>
            <Button
              variant="contained"
              onClick={() => setExpenseCategoryDialogOpen(true)}
            >
              Add Category
            </Button>
          </Stack>
        </Grid>
      </Container>
    </>
  )
}

export default App;
