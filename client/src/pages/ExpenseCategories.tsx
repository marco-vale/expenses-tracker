import React, { useCallback } from 'react';
import ExpenseCategoryFormDialog from '../components/ExpenseCategoryFormDialog';
import { useDialog } from '../hooks/useDialog';
import { useMutation } from '@apollo/client/react';
import { CreateExpenseCategoryDocument, DeleteExpenseCategoryDocument, GetExpenseCategoriesDocument, UpdateExpenseCategoryDocument, type CreateExpenseCategoryMutation, type DeleteExpenseCategoryMutation, type ExpenseCategory, type UpdateExpenseCategoryMutation } from '../graphql/__generated__/graphql';
import { Button, Container, Stack, Typography } from '@mui/material';
import ExpenseCategoriesList from '../components/ExpenseCategoriesList';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import type { ExpenseCategoryFormValues } from '../types/types';

const ExpenseCategories: React.FC = () => {
  const { expenseCategories } = useExpenseCategories(true, true);

  const [createExpenseCategoryMutation] = useMutation<CreateExpenseCategoryMutation>(
    CreateExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument] },
  );

  const [updateExpenseCategoryMutation] = useMutation<UpdateExpenseCategoryMutation>(
    UpdateExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument] },
  );

  const [deleteExpenseCategoryMutation] = useMutation<DeleteExpenseCategoryMutation>(
    DeleteExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument] },
  );

  const {
    isOpen: isExpenseCategoryFormDialogOpen,
    data: expenseCategoryToEdit,
    open: openExpenseCategoryFormDialog,
    close: closeExpenseCategoryFormDialog,
  } = useDialog<ExpenseCategory>();

  const onSubmit = useCallback((values: ExpenseCategoryFormValues) => {
    if (expenseCategoryToEdit?.id) {
      updateExpenseCategoryMutation({
        variables: {
          expenseCategory: {
            id: expenseCategoryToEdit.id,
            name: values.name,
          },
        },
      });
    } else {
      createExpenseCategoryMutation({
        variables: {
          expenseCategory: {
            name: values.name,
          },
        },
      });
    }
  }, [createExpenseCategoryMutation, expenseCategoryToEdit, updateExpenseCategoryMutation]);

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
          openExpenseCategoryFormDialog={openExpenseCategoryFormDialog}
          deleteExpenseCategory={deleteExpenseCategory}
        />

        <Stack direction="row" spacing={2} marginTop="2rem">
          <Button
            variant="contained"
            onClick={() => openExpenseCategoryFormDialog()}
          >
            Add Category
          </Button>
        </Stack>
      </Container>

      <ExpenseCategoryFormDialog
        open={isExpenseCategoryFormDialogOpen}
        close={closeExpenseCategoryFormDialog}
        expenseCategory={expenseCategoryToEdit}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ExpenseCategories;
