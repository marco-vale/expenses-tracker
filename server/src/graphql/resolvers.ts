import { commonResolvers } from './modules/common/resolvers.js';
import { authResolvers } from './modules/auth/resolvers.js';
import { expenseCategoryResolvers } from './modules/expenseCategory/resolvers.js';
import { expenseResolvers } from './modules/expense/resolvers.js';
import { dashboardResolvers } from './modules/dashboard/resolvers.js';
import type { Resolvers } from './__generated__/resolvers-types.js';
import type { GraphQLContext } from './context.js';

export const resolvers: Resolvers<GraphQLContext> = {
  Upload: commonResolvers.Upload,

  Query: {
    ...authResolvers.Query,
    ...dashboardResolvers.Query,
    ...expenseCategoryResolvers.Query,
    ...expenseResolvers.Query,
  },

  User: authResolvers.User,
  ExpenseCategory: expenseCategoryResolvers.ExpenseCategory,

  Mutation: {
    ...authResolvers.Mutation,
    ...expenseCategoryResolvers.Mutation,
    ...expenseResolvers.Mutation,
  },
};
