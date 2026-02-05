import { Expense, ExpenseCategory } from '../../generated/prisma/client';
import { convertDateToString } from '../tools/convertDateToString';
import { Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    expenses: async (parent, { }, context) => {
      const expenses: Expense[] = await context.prisma.expense.findMany({
        include: { category: true },
        orderBy: { date: 'desc' },
      });

      return expenses.map((e) => {
        return {
          ...e,
          date: convertDateToString(e.date),
        };
      });
    },

    expense: async (parent, { id }, context) => {
      const expense: Expense | null = await context.prisma.expense.findFirst({
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

    expenseCategories: async (parent, { }, context) => {
      return context.prisma.expenseCategory.findMany();
    },
  },

  ExpenseCategory: {
    amount: async (parent, { }, context) => {
      return context.loaders.expenseCategoryAmount.load(parent.id);
    },
    deletable: async (parent, { }, context) => {
      return context.loaders.expenseCategoryDeletable.load(parent.id);
    },
  },

  Mutation: {
    createExpense: async (parent, { expense }, context) => {
      const newExpense: Expense = await context.prisma.expense.create({
        data: {
          description: expense.description,
          amount: expense.amount,
          date: new Date(expense.date),
          category: expense.categoryId ? { connect: { id: expense.categoryId } } : undefined,
        },
        include: { category: true },
      });

      return newExpense.id;
    },

    updateExpense: async (parent, { expense }, context) => {
      const updatedExpense: Expense = await context.prisma.expense.update({
        where: { id: expense.id },
        data: {
          description: expense.description,
          amount: expense.amount,
          date: new Date(expense.date),
          category: expense.categoryId ? { connect: { id: expense.categoryId } } : { disconnect: true },
        },
        include: { category: true },
      });

      return updatedExpense.id;
    },

    deleteExpense: async (parent, { id }, context) => {
      await context.prisma.expense.delete({
        where: { id },
      });

      return id;
    },

    upsertExpenseCategory: async (parent, { name }, context) => {
      const upsertedExpenseCategory: ExpenseCategory = await context.prisma.expenseCategory.upsert({
        where: { name },
        update: { name },
        create: { name },
      });

      return upsertedExpenseCategory.id;
    },

    deleteExpenseCategory: async (parent, { id }, context) => {
      await context.prisma.expenseCategory.delete({
        where: { id },
      });

      return id;
    },
  },
};
