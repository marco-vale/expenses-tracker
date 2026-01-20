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

  input ExpenseCreateInput {
    title: String!
    amount: Float!
    date: String!
    categoryId: ID
  }

  input ExpenseUpdateInput {
    id: ID!
    title: String!
    amount: Float!
    date: String!
    categoryId: ID
  }

  type Query {
    expenses: [Expense!]!
    expense(id: ID!): Expense!
  }

  type Mutation {
    createExpense(expense: ExpenseCreateInput!): ID!
    updateExpense(expense: ExpenseUpdateInput!): ID!
    deleteExpense(id: ID!): ID!

    upsertExpenseCategory(name: String!): ID!
  }
`;
