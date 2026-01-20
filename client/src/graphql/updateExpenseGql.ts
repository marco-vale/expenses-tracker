import { gql } from '@apollo/client';

export const updateExpenseGql = gql`
  mutation UpdateExpense($expense: ExpenseUpdateInput!) {
    updateExpense(expense: $expense)
  }
`;
