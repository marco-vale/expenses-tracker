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

  Mutation: {
    createExpense: async (_p: unknown, args: { expense: { title: string; amount: number; date: string; categoryId?: string } }, ctx: GraphQLContext) => {
      const { title, amount, date, categoryId } = args.expense;

      return ctx.prisma.expense.create({
        data: {
          title,
          amount,
          date,
          category: categoryId ? { connect: { id: categoryId } } : undefined,
        },
        include: { category: true },
      });
    },
  },
};
