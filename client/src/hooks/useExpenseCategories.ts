import { useQuery } from '@apollo/client/react';
import { GetExpenseCategoriesDocument, type ExpenseCategory, type GetExpenseCategoriesQuery } from '../graphql/__generated__/graphql';
import { useMemo } from 'react';

export const useExpenseCategories = (calculateAmount: boolean = true) => {
  const { data: expenseCategoriesData } = useQuery<GetExpenseCategoriesQuery>(GetExpenseCategoriesDocument, {
    fetchPolicy: 'network-only',
    variables: { calculateAmount },
  });

  const expenseCategories = useMemo<ExpenseCategory[]>(() => {
    return expenseCategoriesData?.expenseCategories ?? [];
  }, [expenseCategoriesData?.expenseCategories]);

  return {
    expenseCategories,
  };
};
