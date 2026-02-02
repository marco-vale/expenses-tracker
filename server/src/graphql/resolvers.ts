import { Expense, ExpenseCategory, PrismaClient } from '../../generated/prisma/client';
import { convertDateToString } from '../tools/convertDateToString';
import { ExpenseCategoryAmount, Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    expenses: async (_p, { }, context) => {
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

    expense: async (_p, { id }, context) => {
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

    expenseCategories: async (_p, { }, context) => {
      return context.prisma.expenseCategory.findMany();
    },

    expenseAmounts: async (_p, { }, context) => {
      const prisma: PrismaClient = context.prisma;

      const expensesAmountSum = await prisma.expense.aggregate({
        _sum: { amount: true },
      });

      const expenseCategoryAmountSums = await prisma.expense.groupBy({
        by: ['categoryId'],
        _sum: { amount: true },
      });

      const expenseCategories: ExpenseCategory[] = await prisma.expenseCategory.findMany({
        where: {
          id: {
            in: expenseCategoryAmountSums.map((eca) => eca.categoryId).filter((id) => id !== null),
          },
        },
      });

      const categories: ExpenseCategoryAmount[] = expenseCategoryAmountSums.map((ecas) => ({
        amount: ecas._sum.amount || 0,
        category: expenseCategories.find((ec) => ec.id === ecas.categoryId) || { id: '', name: 'Uncategorized' },
      }));

      return {
        amount: expensesAmountSum._sum.amount || 0,
        categories: categories.sort((a, b) => a.category.name.localeCompare(b.category.name)),
      };
    }
  },

  Mutation: {
    createExpense: async (_, { expense }, context) => {
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

    updateExpense: async (_, { expense }, context) => {
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

    deleteExpense: async (_, { id }, context) => {
      await context.prisma.expense.delete({
        where: { id },
      });

      return id;
    },

    upsertExpenseCategory: async (_, { name }, context) => {
      const upsertedExpenseCategory: ExpenseCategory = await context.prisma.expenseCategory.upsert({
        where: { name },
        update: { name },
        create: { name },
      });

      return upsertedExpenseCategory.id;
    },
  },
};
