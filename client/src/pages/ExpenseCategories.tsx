import React from 'react';
import ExpenseCategoryFormDialog from '../components/ExpenseCategoryFormDialog';
import { useDialog } from '../hooks/useDialog';
import { useMutation } from '@apollo/client/react';
import { DeleteExpenseCategoryDocument, GetExpenseCategoriesDocument, UpsertExpenseCategoryDocument, type DeleteExpenseCategoryMutation, type UpsertExpenseCategoryMutation } from '../graphql/__generated__/graphql';
import { Button, Container, Stack, Typography } from '@mui/material';
import ExpenseCategoriesList from '../components/ExpenseCategoriesList';
import { useExpenseCategories } from '../hooks/useExpenseCategories';

const ExpenseCategories: React.FC = () => {
  const { expenseCategories } = useExpenseCategories(true, true);

  const [upsertExpenseCategoryMutation] = useMutation<UpsertExpenseCategoryMutation>(
    UpsertExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument] },
  );

  const [deleteExpenseCategoryMutation] = useMutation<DeleteExpenseCategoryMutation>(
    DeleteExpenseCategoryDocument,
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

  const deleteExpenseCategory = (id: string) => {
    deleteExpenseCategoryMutation({
      variables: {
        id,
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
          deleteExpenseCategory={deleteExpenseCategory}
        />

        <Stack direction="row" spacing={2} marginTop="2rem">
          <Button
            variant="contained"
            onClick={openExpenseCategoryFormDialog}
          >
            Add Category
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
