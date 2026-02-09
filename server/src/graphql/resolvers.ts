import { Expense, ExpenseCategory } from '../../generated/prisma/client';
import { convertDateToString } from '../tools/convertDateToString';
import { handleException } from '../tools/handleException';
import { Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';
import * as Yup from 'yup';

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
        return null;
      }

      return {
        ...expense,
        date: convertDateToString(expense.date),
      };
    },

    expenseCategories: async (parent, { }, context) => {
      return context.prisma.expenseCategory.findMany({
        orderBy: { name: 'asc' },
      });
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
      try {
        const expenseSchema = Yup.object({
          description: Yup.string().required('Description is required'),
          amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
          date: Yup.string().required('Date is required'),
          categoryId: Yup.string(),
        });

        await expenseSchema.validate(expense);

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
      } catch (ex) {
        throw handleException(ex);
      }
    },

    updateExpense: async (parent, { expense }, context) => {
      try {
        const expenseSchema = Yup.object({
          id: Yup.string().required('ID is required'),
          description: Yup.string().required('Description is required'),
          amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
          date: Yup.string().required('Date is required'),
          categoryId: Yup.string(),
        });

        await expenseSchema.validate(expense);

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
      } catch (ex) {
        throw handleException(ex);
      }
    },

    deleteExpense: async (parent, { id }, context) => {
      try {
        await context.prisma.expense.delete({
          where: { id },
        });

        return id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    createExpenseCategory: async (parent, { expenseCategory }, context) => {
      try {
        const expenseCategorySchema = Yup.object({
          name: Yup.string().required('Name is required'),
        });

        await expenseCategorySchema.validate(expenseCategory);

        const newExpenseCategory: ExpenseCategory = await context.prisma.expenseCategory.create({
          data: {
            name: expenseCategory.name,
          },
        });

        return newExpenseCategory.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    updateExpenseCategory: async (parent, { expenseCategory }, context) => {
      try {
        const expenseCategorySchema = Yup.object({
          id: Yup.string().required('ID is required'),
          name: Yup.string().required('Name is required'),
        });

        await expenseCategorySchema.validate(expenseCategory);

        const updatedExpenseCategory: ExpenseCategory = await context.prisma.expenseCategory.update({
          where: { id: expenseCategory.id },
          data: {
            name: expenseCategory.name,
          },
        });

        return updatedExpenseCategory.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    deleteExpenseCategory: async (parent, { id }, context) => {
      try {
        await context.prisma.expenseCategory.delete({
          where: { id },
        });

        return id;
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },
};
