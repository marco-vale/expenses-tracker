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

  type Query {
    expenses: [Expense!]!
  }
`;
