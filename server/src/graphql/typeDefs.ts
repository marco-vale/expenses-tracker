export const typeDefs = `#graphql
  scalar Upload

  type User {
    id: ID!
    email: String!
    name: String
    picture: String
    startingBalance: Float!
  }

  type ExpenseCategory {
    id: ID!
    name: String!
    amount: Float
    deletable: Boolean
  }

  input ExpenseCategoriesOptions {
    page: Int!
    rowsPerPage: Int!
  }

  type ExpenseCategoriesReturn {
    expenseCategories: [ExpenseCategory!]!
    count: Int!
  }

  enum ExpenseType {
    EXPENSE
    INCOME
  }

  type Expense {
    id: ID!
    description: String!
    type: ExpenseType!
    amount: Float!
    date: String!
    category: ExpenseCategory
  }

  input ExpensesOptions {
    page: Int!
    rowsPerPage: Int!
  }

  type ExpensesReturn {
    expenses: [Expense!]!
    count: Int!
  }

  type ExpensesSummaryCategory {
    id: ID
    name: String!
    amount: Float!
  }

  type ExpensesSummary {
    expensesAmount: Float!
    incomeAmount: Float!
    balance: Float!
    categories: [ExpensesSummaryCategory!]!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserCreateInput {
    email: String!
    password: String!
    name: String
    picture: Upload
    startingBalance: Float
  }

  input UserUpdateInput {
    id: ID!
    name: String
    picture: Upload
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
    type: ExpenseType!
    amount: Float!
    date: String!
    categoryId: ID
  }

  input ExpenseUpdateInput {
    id: ID!
    description: String!
    type: ExpenseType!
    amount: Float!
    date: String!
    categoryId: ID
  }

  input ExpensesImportInput {
    file: Upload!
    importCategories: Boolean
  }

  type Query {
    me(userToken: String!): User!

    expenseCategories(options: ExpenseCategoriesOptions): ExpenseCategoriesReturn

    expenses(options: ExpensesOptions): ExpensesReturn
    expense(id: ID!): Expense!

    expensesSummary(userToken: String!): ExpensesSummary!
  }

  type Mutation {
    login(login: LoginInput!): String!

    createUser(user: UserCreateInput!): ID!
    updateUser(user: UserUpdateInput!): ID!

    createExpenseCategory(expenseCategory: ExpenseCategoryCreateInput!): ID!
    updateExpenseCategory(expenseCategory: ExpenseCategoryUpdateInput!): ID!
    deleteExpenseCategory(id: ID!): ID!

    createExpense(expense: ExpenseCreateInput!): ID!
    updateExpense(expense: ExpenseUpdateInput!): ID!
    deleteExpense(id: ID!): ID!

    importExpenses(importData: ExpensesImportInput!): [ID!]!

    deleteAll: Int!
  }
`;
