import { gql } from 'graphql-tag';

export const types = gql`
  type ExpenseCategory {
    id: ID!
    name: String!
  }

  type Expense {
    id: ID!
    title: String!
    amount: Float!
    date: String!
    category: ExpenseCategory
  }
`;
