import React from 'react';
import ExpenseCategoryFormDialog from '../components/ExpenseCategoryFormDialog';
import { useDialog } from '../hooks/useDialog';
import { useMutation } from '@apollo/client/react';
import { GetExpenseCategoriesDocument, UpsertExpenseCategoryDocument, type UpsertExpenseCategoryMutation } from '../graphql/__generated__/graphql';
import { Button, Container, Stack, Typography } from '@mui/material';
import ExpenseCategoriesList from '../components/ExpenseCategoriesList';
import { AppRoutes } from '../routes/routes';
import { Link } from 'react-router';
import { useExpenseCategories } from '../hooks/useExpenseCategories';

const ExpenseCategories: React.FC = () => {
  const { expenseCategories } = useExpenseCategories();

  const [upsertExpenseCategoryMutation] = useMutation<UpsertExpenseCategoryMutation>(
    UpsertExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument] },
  );

  const {
    isOpen: isExpenseCategoryFormDialogOpen,
    open: openExpenseCategoryFormDialog,
    close: closeExpenseCategoryFormDialog,
  } = useDialog();

  const upsertExpenseCategory = (name: string) => {
    upsertExpenseCategoryMutation({
      variables: {
        name,
      },
    });
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
          Expense Categories
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Manage your expense categories here.
        </Typography>

        <ExpenseCategoriesList
          expenseCategories={expenseCategories}
        />

        <Stack direction="row" spacing={2} marginTop="2rem">
          <Button
            variant="contained"
            onClick={openExpenseCategoryFormDialog}
          >
            Add Category
          </Button>
          <Button
            variant="contained"
            component={Link}
            to={AppRoutes.Home}
          >
            Expenses
          </Button>
        </Stack>
      </Container>

      <ExpenseCategoryFormDialog
        open={isExpenseCategoryFormDialogOpen}
        close={closeExpenseCategoryFormDialog}
        upsertExpenseCategory={upsertExpenseCategory}
      />
    </>
  );
};

export default ExpenseCategories;
