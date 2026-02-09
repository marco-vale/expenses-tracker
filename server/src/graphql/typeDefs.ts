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

  input UserCreateInput {
    email: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input ExpenseCategoryCreateInput {
    name: String!
  }

  input ExpenseCategoryUpdateInput {
    id: ID!
    name: String!
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
    expenseCategories: [ExpenseCategory!]!

    expenses: [Expense!]!
    expense(id: ID!): Expense!
  }

  type Mutation {
    createUser(user: UserCreateInput!): ID!
    loginUser(user: UserLoginInput!): ID!

    createExpenseCategory(expenseCategory: ExpenseCategoryCreateInput!): ID!
    updateExpenseCategory(expenseCategory: ExpenseCategoryUpdateInput!): ID!
    deleteExpenseCategory(id: ID!): ID!

    createExpense(expense: ExpenseCreateInput!): ID!
    updateExpense(expense: ExpenseUpdateInput!): ID!
    deleteExpense(id: ID!): ID!
  }
`;
