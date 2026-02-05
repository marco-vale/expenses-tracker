export const typeDefs = `#graphql
  type ExpenseCategory {
    id: ID!
    name: String!
    amount: Float
    deletable: Boolean
  }

  type Expense {
    id: ID!
    description: String!
    amount: Float!
    date: String!
    category: ExpenseCategory
  }

  input ExpenseCreateInput {
    description: String!
    amount: Float!
    date: String!
    categoryId: ID
  }

  input ExpenseUpdateInput {
    id: ID!
    description: String!
    amount: Float!
    date: String!
    categoryId: ID
  }

  type Query {
    expenses: [Expense!]!
    expense(id: ID!): Expense!

    expenseCategories: [ExpenseCategory!]!
  }

  type Mutation {
    createExpense(expense: ExpenseCreateInput!): ID!
    updateExpense(expense: ExpenseUpdateInput!): ID!
    deleteExpense(id: ID!): ID!

    upsertExpenseCategory(name: String!): ID!
    deleteExpenseCategory(id: ID!): ID!
  }
`;
