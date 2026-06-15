import { Expense, ExpenseCategory, ExpenseType, User } from '../../generated/prisma/client';
import { DashboardChartType, ExpensesSummary, Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';
import * as Yup from 'yup';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import { BatchPayload, ExpenseCategoryWhereInput, ExpenseWhereInput } from '../../generated/prisma/internal/prismaNamespace';
import importExpenses from '../helpers/importExpenses';
import uploadFile from '../helpers/uploadFile';
import getPrismaArgsFromQueryOptions from '../helpers/getPrismaArgsFromQueryOptions';
import handleException from '../helpers/handleException';
import checkAuth from '../helpers/checkAuth';
import getDashboardBarChart from '../helpers/getDashboardBarChart';
import getDashboardPieChart from '../helpers/getDashboardPieChart';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { convertDateToString, parseDateString } from '../tools/tools';
import { yupDateValidation, yupNumberPositiveOrZeroValidation } from '../validations/validations';

dayjs.extend(utc);

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    me: async (parent, { }, context) => {
      try {
        return checkAuth(context);
      } catch (ex) {
        throw handleException(ex);
      }
    },

    dashboardChart: async (parent, { type, filters }, context) => {
      try {
        const user: User = checkAuth(context);

        const dashboardChartFiltersSchema = Yup.object({
          startDate: yupDateValidation,
          endDate: yupDateValidation,
        });

        await dashboardChartFiltersSchema.validate(filters);

        if (type === DashboardChartType.Bar) {
          return getDashboardBarChart(user.id, context.prisma, filters);
        }

        if (type === DashboardChartType.Pie) {
          return getDashboardPieChart(user.id, context.prisma, filters);
        }

        throw new Error('Invalid chart type');
      } catch (ex) {
        throw handleException(ex);
      }
    },

    expenseCategories: async (parent, { filters, options }, context) => {
      try {
        const user: User = checkAuth(context);

        const expenseCategoriesFiltersSchema = Yup.object({
          name: Yup.string(),
        });

        await expenseCategoriesFiltersSchema.validate(filters);

        const prismaWhereInput: ExpenseCategoryWhereInput = {
          name: filters?.name ? { contains: filters.name } : undefined,
          userId: user.id,
        };

        const [expenseCategories, count] = await context.prisma.$transaction([
          context.prisma.expenseCategory.findMany({
            ...getPrismaArgsFromQueryOptions(options),
            where: prismaWhereInput,
          }),
          context.prisma.expenseCategory.count({
            where: prismaWhereInput,
          }),
        ]);

        return {
          expenseCategories,
          count,
        };
      } catch (ex) {
        throw handleException(ex);
      }
    },

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

        const expenseCategories: ExpenseCategory[] = await context.prisma.expenseCategory.findMany();

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

  User: {
    startingBalanceEditable: async (parent, { }, context) => {
      return context.loaders.userStartingBalanceEditable.load(parent.id);
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
    login: async (parent, { login }, context) => {
      try {
        const loginSchema = Yup.object({
          email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
          password: Yup.string().required('Password is required'),
        });

        await loginSchema.validate(login);

        const existingUser: User | null = await context.prisma.user.findUnique({
          where: { email: login.email },
        });

        if (!existingUser) {
          throw new Error('Invalid e-mail or password');
        }

        const passwordValid: boolean = await argon2.verify(
          existingUser.password,
          login.password,
        );

        if (!passwordValid) {
          throw new Error('Invalid e-mail or password');
        }

        const userToken: string = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email,
          },
          process.env.JWT_SECRET!,
          { expiresIn: '4h' }
        );

        return userToken;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    createUser: async (parent, { user }, context) => {
      try {
        const userSchema = Yup.object({
          email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
          password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
          name: Yup.string(),
          picture: Yup.mixed<Promise<FileUpload>>(),
          startingBalance: yupNumberPositiveOrZeroValidation,
        });

        await userSchema.validate(user);

        const hashedPassword: string = await argon2.hash(user.password);
        const picturePath: string | undefined = await uploadFile(user.picture);

        const newUser: User = await context.prisma.user.create({
          data: {
            email: user.email,
            password: hashedPassword,
            name: user.name,
            picture: picturePath,
            startingBalance: user.startingBalance ?? 0,
          },
        });

        return newUser.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    updateUser: async (parent, { user }, context) => {
      try {
        const currentUser: User = checkAuth(context);

        const userSchema = Yup.object({
          name: Yup.string(),
          picture: Yup.mixed<Promise<FileUpload>>(),
          startingBalance: yupNumberPositiveOrZeroValidation,
        });

        await userSchema.validate(user);

        const picturePath: string | undefined = await uploadFile(user.picture);

        const updatedUser: User = await context.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            name: user.name,
            picture: picturePath,
            startingBalance: user.startingBalance ?? 0,
          },
        });

        return updatedUser.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    createExpenseCategory: async (parent, { expenseCategory }, context) => {
      try {
        const user: User = checkAuth(context);

        const expenseCategorySchema = Yup.object({
          name: Yup.string().required('Name is required'),
          color: Yup.string().matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
        });

        await expenseCategorySchema.validate(expenseCategory);

        const newExpenseCategory: ExpenseCategory = await context.prisma.expenseCategory.create({
          data: {
            name: expenseCategory.name,
            color: expenseCategory.color,
            user: { connect: { id: user.id } },
          },
        });

        return newExpenseCategory.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    updateExpenseCategory: async (parent, { expenseCategory }, context) => {
      try {
        const user: User = checkAuth(context);

        const expenseCategorySchema = Yup.object({
          id: Yup.string().required('ID is required'),
          name: Yup.string().required('Name is required'),
          color: Yup.string().matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
        });

        await expenseCategorySchema.validate(expenseCategory);

        const updatedExpenseCategory: ExpenseCategory = await context.prisma.expenseCategory.update({
          where: {
            id: expenseCategory.id,
            userId: user.id,
          },
          data: {
            name: expenseCategory.name,
            color: expenseCategory.color,
          },
        });

        return updatedExpenseCategory.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    deleteExpenseCategory: async (parent, { id }, context) => {
      try {
        const user: User = checkAuth(context);

        await context.prisma.expenseCategory.delete({
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

  Upload: GraphQLUpload,
};
