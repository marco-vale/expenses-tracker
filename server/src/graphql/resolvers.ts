import { commonResolvers } from './modules/common/resolvers';
import { authResolvers } from './modules/auth/resolvers';
import { expenseCategoryResolvers } from './modules/expenseCategory/resolvers';
import { expenseResolvers } from './modules/expense/resolvers';
import { dashboardResolvers } from './modules/dashboard/resolvers';
import type { Resolvers } from './__generated__/resolvers-types';
import type { GraphQLContext } from './context';

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
