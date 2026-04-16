import React, { useCallback } from 'react';
import ExpenseCategoryFormDialog from '../components/ExpenseCategoryFormDialog';
import { useDialog } from '../hooks/useDialog';
import { useMutation, useQuery } from '@apollo/client/react';
import { CreateExpenseCategoryDocument, DeleteExpenseCategoryDocument, GetExpenseCategoriesDocument, OrderDirection, UpdateExpenseCategoryDocument, type CreateExpenseCategoryMutation, type CreateExpenseCategoryMutationVariables, type DeleteExpenseCategoryMutation, type DeleteExpenseCategoryMutationVariables, type ExpenseCategory, type GetExpenseCategoriesQuery, type GetExpenseCategoriesQueryVariables, type UpdateExpenseCategoryMutation, type UpdateExpenseCategoryMutationVariables } from '../graphql/__generated__/graphql';
import { Button, Stack, Typography } from '@mui/material';
import ExpenseCategoriesList from '../components/ExpenseCategoriesList';
import type { ExpenseCategoryFormValues } from '../types/types';
import { useErrors } from '../hooks/useErrors';
import { Add } from '@mui/icons-material';
import { useTable } from '../hooks/useTable';

const ExpenseCategories: React.FC = () => {
  const expenseCategoriesTable = useTable({
    orderBy: 'name',
    orderDirection: OrderDirection.Asc,
    rowsPerPage: 10,
  });
  const expenseCategoryFormDialog = useDialog<ExpenseCategory>();
  const { onError } = useErrors();

  const { data: expenseCategoriesData, loading: expenseCategoriesLoading } = useQuery<GetExpenseCategoriesQuery, GetExpenseCategoriesQueryVariables>(
    GetExpenseCategoriesDocument,
    {
      variables: {
        options: {
          page: expenseCategoriesTable.page,
          rowsPerPage: expenseCategoriesTable.rowsPerPage,
          orderBy: expenseCategoriesTable.orderBy,
          orderDirection: expenseCategoriesTable.orderDirection,
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

  const expenseCategories: ExpenseCategory[] = expenseCategoriesData?.expenseCategories?.expenseCategories ?? [];
  const expenseCategoriesCount: number = expenseCategoriesData?.expenseCategories?.count ?? 0;

  const onSubmit = useCallback((values: ExpenseCategoryFormValues) => {
    if (expenseCategoryFormDialog.data?.id) {
      updateExpenseCategoryMutation({
        variables: {
          expenseCategory: {
            id: expenseCategoryFormDialog.data.id,
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
  }, [createExpenseCategoryMutation, expenseCategoryFormDialog.data, updateExpenseCategoryMutation]);

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
        expenseCategoriesTable={expenseCategoriesTable}
        openExpenseCategoryFormDialog={expenseCategoryFormDialog.open}
        deleteExpenseCategory={deleteExpenseCategory}
      />

      <Stack direction="row" spacing={2} marginTop="2rem">
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => expenseCategoryFormDialog.open()}
        >
          Add Category
        </Button>
      </Stack>

      <ExpenseCategoryFormDialog
        expenseCategoryFormDialog={expenseCategoryFormDialog}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ExpenseCategories;
