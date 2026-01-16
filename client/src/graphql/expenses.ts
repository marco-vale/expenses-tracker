import { gql } from '@apollo/client';

export const expensesQuery = gql`
  query expenses {
    expenses {
      id
      title
      amount
      date
    }
  }
`;
