import { GraphQLContext } from './context.js';

export const resolvers = {
  Query: {
    expenses: async (_p: unknown, _a: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.expense.findMany({
        include: { category: true },
        orderBy: { date: 'desc' },
      });
    },
  },
};
