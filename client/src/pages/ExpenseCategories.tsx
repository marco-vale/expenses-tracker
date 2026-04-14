import React, { useCallback } from 'react';
import ExpenseCategoryFormDialog from '../components/ExpenseCategoryFormDialog';
import { useDialog } from '../hooks/useDialog';
import { useMutation, useQuery } from '@apollo/client/react';
import { CreateExpenseCategoryDocument, DeleteExpenseCategoryDocument, GetExpenseCategoriesDocument, UpdateExpenseCategoryDocument, type CreateExpenseCategoryMutation, type CreateExpenseCategoryMutationVariables, type DeleteExpenseCategoryMutation, type DeleteExpenseCategoryMutationVariables, type ExpenseCategory, type GetExpenseCategoriesQuery, type GetExpenseCategoriesQueryVariables, type UpdateExpenseCategoryMutation, type UpdateExpenseCategoryMutationVariables } from '../graphql/__generated__/graphql';
import { Button, Stack, Typography } from '@mui/material';
import ExpenseCategoriesList from '../components/ExpenseCategoriesList';
import type { ExpenseCategoryFormValues } from '../types/types';
import { useErrors } from '../hooks/useErrors';
import { Add } from '@mui/icons-material';

const ExpenseCategories: React.FC = () => {
  const { onError } = useErrors();

  const { data: expenseCategoriesData, loading: expenseCategoriesLoading, refetch: refetchExpenseCategoriesQuery } = useQuery<GetExpenseCategoriesQuery, GetExpenseCategoriesQueryVariables>(
    GetExpenseCategoriesDocument,
    {
      variables: {
        options: {
          page: 0,
          rowsPerPage: 10,
        },
      },
      fetchPolicy: 'network-only',
    }
  );

  const [createExpenseCategoryMutation] = useMutation<CreateExpenseCategoryMutation, CreateExpenseCategoryMutationVariables>(
    CreateExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument], onError },
  );

  const [updateExpenseCategoryMutation] = useMutation<UpdateExpenseCategoryMutation, UpdateExpenseCategoryMutationVariables>(
    UpdateExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument], onError },
  );

  const [deleteExpenseCategoryMutation] = useMutation<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>(
    DeleteExpenseCategoryDocument,
    { refetchQueries: [GetExpenseCategoriesDocument], onError },
  );

  const {
    isOpen: isExpenseCategoryFormDialogOpen,
    data: expenseCategoryToEdit,
    open: openExpenseCategoryFormDialog,
    close: closeExpenseCategoryFormDialog,
  } = useDialog<ExpenseCategory>();

  const expenseCategories: ExpenseCategory[] = expenseCategoriesData?.expenseCategories?.expenseCategories ?? [];
  const expenseCategoriesCount: number = expenseCategoriesData?.expenseCategories?.count ?? 0;

  const refetchExpenseCategories = useCallback((page: number, rowsPerPage: number) => {
    refetchExpenseCategoriesQuery({ options: { page, rowsPerPage } });
  }, [refetchExpenseCategoriesQuery]);

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
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Categories
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Manage your categories here.
      </Typography>

      <ExpenseCategoriesList
        expenseCategories={expenseCategories}
        expenseCategoriesCount={expenseCategoriesCount}
        expenseCategoriesLoading={expenseCategoriesLoading}
        refetchExpenseCategories={refetchExpenseCategories}
        openExpenseCategoryFormDialog={openExpenseCategoryFormDialog}
        deleteExpenseCategory={deleteExpenseCategory}
      />

      <Stack direction="row" spacing={2} marginTop="2rem">
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => openExpenseCategoryFormDialog()}
        >
          Add Category
        </Button>
      </Stack>

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
