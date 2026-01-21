import { gql } from '@apollo/client';

export const getExpenseAmountsGql = gql`
  query GetExpenseAmounts {
    expenseAmounts {
      amount
      categories {
        category {
          id
          name
        }
        amount
      }
    }
  }
`;
