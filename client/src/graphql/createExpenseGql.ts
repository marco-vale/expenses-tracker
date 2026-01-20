import { gql } from '@apollo/client';

export const createExpenseGql = gql`
  mutation CreateExpense($expense: ExpenseCreateInput!) {
    createExpense(expense: $expense)
  }
`;
