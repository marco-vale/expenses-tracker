import { gql } from '@apollo/client';

export const getExpenseCategoriesGql = gql`
  query GetExpenseCategories {
    expenseCategories {
      id
      name
    }
  }
`;
