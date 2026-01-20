import { gql } from '@apollo/client';

export const getExpenseGql = gql`
  query GetExpense($id: ID!) {
    expense(id: $id) {
      id
      title
      amount
      date
    }
  }
`;
