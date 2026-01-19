export const typeDefs = `#graphql
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

  input ExpenseInput {
    title: String!
    amount: Float!
    date: String!
    categoryId: ID
  }

  type Query {
    expenses: [Expense!]!
  }

  type Mutation {
    createExpense(expense: ExpenseInput!): Expense!
  }
`;
