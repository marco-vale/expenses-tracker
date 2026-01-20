import { gql } from '@apollo/client';

export const getExpensesGql = gql`
  query GetExpenses {
    expenses {
      id
      title
      amount
      date
      category {
        id
        name
      }
    }
  }
`;
