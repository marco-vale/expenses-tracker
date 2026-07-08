import { useQuery } from '@apollo/client/react';
import { GetExpenseCategoriesDocument, type ExpenseCategory, type GetExpenseCategoriesQuery, type GetExpenseCategoriesQueryVariables } from '../graphql/__generated__/graphql';
import { useMemo } from 'react';

/**
 * Custom hook to fetch expense categories, intended to be used in forms.
 *
 * @returns An object containing:
 * - `expenseCategories`: An array of expense categories retrieved from the GraphQL query.
 * - `expenseCategoriesLoading`: A boolean indicating whether the query is currently loading.
 *
 * @example
 * ```tsx
 * const { expenseCategories, expenseCategoriesLoading } = useExpenseCategories();
 * ```
 */
export const useExpenseCategories = () => {
  const { data: expenseCategoriesData, loading: expenseCategoriesLoading } = useQuery<GetExpenseCategoriesQuery, GetExpenseCategoriesQueryVariables>(
    GetExpenseCategoriesDocument,
    {
      variables: {
        getAmount: false,
        getDeletable: false,
      },
      fetchPolicy: 'network-only',
    }
  );

  const expenseCategories = useMemo<ExpenseCategory[]>(() => {
    return [
      // Sentinel for "no category"; the server maps id '' to categoryId IS NULL.
      {
        id: '',
        name: 'Uncategorized',
        color: null,
        amount: null,
        deletable: null,
      },
      ...(expenseCategoriesData?.expenseCategories?.expenseCategories ?? [])
    ];
  }, [expenseCategoriesData?.expenseCategories?.expenseCategories]);

  return {
    expenseCategories,
    expenseCategoriesLoading,
  };
};
