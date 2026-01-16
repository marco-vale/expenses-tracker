import { gql } from '@apollo/client';

export const getExpenses = gql`
  query GetExpenses {
    expenses {
      id
      title
      amount
      date
    }
  }
`;
