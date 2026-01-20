import { convertDateToString } from '../tools/convertDateToString';
import { Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    expenses: async (_p, {}, context) => {
      const expenses = await context.prisma.expense.findMany({
        include: { category: true },
        orderBy: { date: 'desc' },
      });

      return expenses.map((expense) => {
        return {
          ...expense,
          date: convertDateToString(expense.date),
        };
      });
    },

    expense: async (_p, { id }, context) => {
      const expense = await context.prisma.expense.findFirst({
        where: { id },
        include: { category: true },
      });

      if (!expense) {
        throw new Error(`Expense with id ${id} not found`);
      }

      return {
        ...expense,
        date: convertDateToString(expense.date),
      };
    },

    expenseCategories: async (_p, {}, context) => {
      return context.prisma.expenseCategory.findMany();
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

      return newExpense.id;
    },

    updateExpense: async (_, { expense }, context) => {
      const updatedExpense = await context.prisma.expense.update({
        where: { id: expense.id },
        data: {
          title: expense.title,
          amount: expense.amount,
          date: new Date(expense.date),
          category: expense.categoryId ? { connect: { id: expense.categoryId } } : { disconnect: true },
        },
        include: { category: true },
      });

      return updatedExpense.id;
    },

    deleteExpense: async (_, { id }, context) => {
      await context.prisma.expense.delete({
        where: { id },
      });

      return id;
    },

    upsertExpenseCategory: async (_, { name }, context) => {
      const upsertedExpenseCategory = await context.prisma.expenseCategory.upsert({
        where: { name },
        update: { name },
        create: { name },
      });

      return upsertedExpenseCategory.id;
    },
  },
};
