import { useQuery } from '@apollo/client/react';
import { GetExpenseCategoriesDocument, type ExpenseCategory, type GetExpenseCategoriesQuery } from '../graphql/__generated__/graphql';
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
export const useExpenseCategories = (
  getAmount: boolean = true,
  getDeletable: boolean = false,
) => {
  const { data: expenseCategoriesData } = useQuery<GetExpenseCategoriesQuery>(GetExpenseCategoriesDocument, {
    fetchPolicy: 'network-only',
    variables: {
      getAmount,
      getDeletable,
    },
  });

  const expenseCategories = useMemo<ExpenseCategory[]>(() => {
    return expenseCategoriesData?.expenseCategories ?? [];
  }, [expenseCategoriesData?.expenseCategories]);

  return {
    expenseCategories,
  };
};
