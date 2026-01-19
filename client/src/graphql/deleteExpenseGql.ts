import { gql } from '@apollo/client';

export const deleteExpenseGql = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;