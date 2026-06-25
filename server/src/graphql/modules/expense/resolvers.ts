import { Expense, ExpenseCategory, ExpenseType, User } from '../../../../generated/prisma/client';
import { BatchPayload, ExpenseWhereInput } from '../../../../generated/prisma/internal/prismaNamespace';
import type { ExpensesSummary, Resolvers } from '../../__generated__/resolvers-types';
import type { GraphQLContext } from '../../context';
import type { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import * as Yup from 'yup';
import handleException from '../../../helpers/handleException';
import checkAuth from '../../../helpers/checkAuth';
import getPrismaArgsFromQueryOptions from '../../../helpers/getPrismaArgsFromQueryOptions';
import importExpenses from '../../../helpers/importExpenses';
import uploadFile from '../../../helpers/uploadFile';
import { convertDateToString, parseDateString } from '../../../tools/tools';
import { yupDateValidation } from '../../../validations/validations';

export const expenseResolvers: Resolvers<GraphQLContext> = {
  Query: {
    expenses: async (parent, { filters, options }, context) => {
      try {
        const user: User = checkAuth(context);

        const expensesFiltersSchema = Yup.object({
          types: Yup.array().of(Yup.mixed<ExpenseType>().oneOf(Object.values(ExpenseType))),
          startDate: yupDateValidation,
          endDate: yupDateValidation,
          categories: Yup.array().of(Yup.string()),
        });

        await expensesFiltersSchema.validate(filters);

        const prismaWhereInput: ExpenseWhereInput = {
          type: filters?.types && filters.types.length > 0
            ? { in: filters.types }
            : undefined,
          date: {
            gte: filters?.startDate ? parseDateString(filters.startDate) : undefined,
            lte: filters?.endDate ? parseDateString(filters.endDate) : undefined,
          },
          categoryId: filters?.categories && filters.categories.length > 0
            ? { in: filters.categories }
            : undefined,
          userId: user.id,
        };

        const [expenses, count] = await context.prisma.$transaction([
          context.prisma.expense.findMany({
            include: { category: true },
            ...getPrismaArgsFromQueryOptions(options),
            where: prismaWhereInput,
          }),
          context.prisma.expense.count({
            where: prismaWhereInput,
          }),
        ]);

        return {
          expenses: expenses.map((e) => {
            return {
              ...e,
              date: convertDateToString(e.date),
            };
          }),
          count,
        };
      } catch (ex) {
        throw handleException(ex);
      }
    },

    expense: async (parent, { id }, context) => {
      try {
        const user: User = checkAuth(context);

        const expense: Expense | null = await context.prisma.expense.findFirst({
          where: {
            id,
            userId: user.id,
          },
          include: { category: true },
        });

        if (!expense) {
          throw new Error('Expense not found');
        }

        return {
          ...expense,
          date: convertDateToString(expense.date),
        };
      } catch (ex) {
        throw handleException(ex);
      }
    },

    expensesSummary: async (parent, { }, context) => {
      try {
        const user: User = checkAuth(context);

        const expensesSummary: ExpensesSummary = {
          expensesAmount: 0,
          incomeAmount: 0,
          balance: user.startingBalance,
          categories: [],
        };

        const expenseAmountsByType = await context.prisma.expense.groupBy({
          where: { userId: user.id },
          by: ['type'],
          _sum: { amount: true },
        });

        expenseAmountsByType.forEach((eabt) => {
          if (eabt.type === ExpenseType.EXPENSE) {
            expensesSummary.expensesAmount = eabt._sum.amount ?? 0;
          }

          if (eabt.type === ExpenseType.INCOME) {
            expensesSummary.incomeAmount = eabt._sum.amount ?? 0;
          }

          expensesSummary.balance += eabt._sum.amount ?? 0;
        });

        const expenseAmountsByCategory = await context.prisma.expense.groupBy({
          where: {
            userId: user.id,
            type: ExpenseType.EXPENSE,
          },
          by: ['categoryId'],
          _sum: { amount: true },
        });

        const expenseCategories: ExpenseCategory[] = await context.prisma.expenseCategory.findMany({
          where: { userId: user.id },
        });

        expensesSummary.categories = expenseAmountsByCategory.map((eabc) => {
          const expensesCategory: ExpenseCategory | undefined = expenseCategories.find((ec) => ec.id === eabc.categoryId);

          return {
            id: eabc.categoryId,
            name: expensesCategory ? expensesCategory.name : 'Uncategorized',
            amount: eabc._sum.amount ?? 0,
          };
        })

        return expensesSummary;
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },

  Mutation: {
    createExpense: async (parent, { expense }, context) => {
      try {
        const user: User = checkAuth(context);

        const expenseSchema = Yup.object({
          description: Yup.string().required('Description is required'),
          type: Yup.mixed<ExpenseType>().required('Type is required').oneOf(Object.values(ExpenseType)),
          amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
          date: Yup.string().required('Date is required').concat(yupDateValidation),
          categoryId: Yup.string(),
        });

        await expenseSchema.validate(expense);

        const newExpense: Expense = await context.prisma.expense.create({
          data: {
            description: expense.description,
            type: expense.type,
            amount: expense.type === ExpenseType.EXPENSE ? -expense.amount : expense.amount,
            date: parseDateString(expense.date),
            category: expense.categoryId ? { connect: { id: expense.categoryId } } : undefined,
            user: { connect: { id: user.id } },
          },
        });

        return newExpense.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    updateExpense: async (parent, { expense }, context) => {
      try {
        const user: User = checkAuth(context);

        const expenseSchema = Yup.object({
          id: Yup.string().required('ID is required'),
          description: Yup.string().required('Description is required'),
          type: Yup.mixed<ExpenseType>().required('Type is required').oneOf(Object.values(ExpenseType)),
          amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
          date: Yup.string().required('Date is required').concat(yupDateValidation),
          categoryId: Yup.string(),
        });

        await expenseSchema.validate(expense);

        const updatedExpense: Expense = await context.prisma.expense.update({
          where: {
            id: expense.id,
            userId: user.id,
          },
          data: {
            description: expense.description,
            type: expense.type,
            amount: expense.type === ExpenseType.EXPENSE ? -expense.amount : expense.amount,
            date: parseDateString(expense.date),
            category: expense.categoryId ? { connect: { id: expense.categoryId } } : { disconnect: true },
          },
        });

        return updatedExpense.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    deleteExpense: async (parent, { id }, context) => {
      try {
        const user: User = checkAuth(context);

        await context.prisma.expense.delete({
          where: {
            id,
            userId: user.id,
          },
        });

        return id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    importExpenses: async (parent, { importData }, context) => {
      try {
        const user: User = checkAuth(context);

        const importDataSchema = Yup.object({
          file: Yup.mixed<Promise<FileUpload>>().required('File is required'),
        });

        await importDataSchema.validate(importData);

        const filePath = await uploadFile(importData.file);
        if (!filePath) {
          throw new Error('File upload failed');
        }

        const importedExpenses: Expense[] = await importExpenses(
          filePath,
          context.prisma,
          user,
          importData.importCategories ?? false,
        );

        return importedExpenses.map(ie => ie.id);
      } catch (ex) {
        throw handleException(ex);
      }
    },

    deleteAll: async (parent, { }, context) => {
      try {
        const user: User = checkAuth(context);

        const transaction: BatchPayload[] = await context.prisma.$transaction([
          context.prisma.expense.deleteMany({
            where: { userId: user.id },
          }),
          context.prisma.expenseCategory.deleteMany({
            where: { userId: user.id },
          }),
        ]);

        return transaction.reduce((count, batch) => count + batch.count, 0);
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },
};
