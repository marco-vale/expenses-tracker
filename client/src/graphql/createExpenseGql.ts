import { gql } from '@apollo/client';

export const createExpenseGql = gql`
  mutation CreateExpense($expense: ExpenseInput!) {
    createExpense(expense: $expense) {
      id
      title
      amount
      date
    }
  }
`;
