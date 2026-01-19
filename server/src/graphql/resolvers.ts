import { Expense, ExpenseInput, MutationCreateExpenseArgs, RequireFields, Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    expenses: async (_p, {}, context) => {
      const expenses = await context.prisma.expense.findMany({
        include: { category: true },
        orderBy: { date: 'desc' },
      });

      return expenses.map((dbExpense) => {
        return {
          ...dbExpense,
          date: dbExpense.date.toISOString(),
        };
      });
    },
  },

  Mutation: {
    createExpense: async (_, { expense }, context) => {
      const newExpense = await context.prisma.expense.create({
        data: {
          title: expense.title,
          amount: expense.amount,
          date: new Date(expense.date),
          category: expense.categoryId ? { connect: { id: expense.categoryId } } : undefined,
        },
        include: { category: true },
      });


      return {
        ...newExpense,
        date: newExpense.date.toISOString(),
      };
    },
  },
};
