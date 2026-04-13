import { useQuery } from '@apollo/client/react';
import { GetExpenseCategoriesDocument, type ExpenseCategory, type GetExpenseCategoriesQuery, type GetExpenseCategoriesQueryVariables } from '../graphql/__generated__/graphql';
import { useMemo } from 'react';

/**
 * Custom hook to fetch expense categories.
 *
 * @param getAmount - Whether to include the expenses amount in the query. Defaults to `true`.
 * @param getDeletable - Whether to include if the category is deletable in the query. Defaults to `false`.
 *
 * @returns An object containing:
 * - `expenseCategories`: An array of expense categories retrieved from the GraphQL query.
 *
 * @example
 * ```tsx
 * const { expenseCategories } = useExpenseCategories(true, false);
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
    return expenseCategoriesData?.expenseCategories?.expenseCategories ?? [];
  }, [expenseCategoriesData?.expenseCategories?.expenseCategories]);

  return {
    expenseCategories,
    expenseCategoriesLoading,
  };
};
