import { Expense, ExpenseCategory, User } from '../../generated/prisma/client';
import { convertDateToString } from '../tools/convertDateToString';
import { handleException } from '../tools/handleException';
import { ExpenseCreateInput, Resolvers } from './__generated__/resolvers-types';
import { GraphQLContext } from './context';
import * as Yup from 'yup';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { ExpenseImportRow, UserToken } from '../types/types';
import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import XLSX from 'xlsx';
import path from 'path';
import { parseNumber } from '../tools/parseNumber';
import { parseDate } from '../tools/parseDate';
import { BatchPayload } from '../../generated/prisma/internal/prismaNamespace';
import { uploadFile } from '../tools/uploadFile';

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    me: async (parent, { userToken }, context) => {
      try {
        const decodedUserToken = jwt.verify(userToken, process.env.JWT_SECRET!) as UserToken;

        const user: User | null = await context.prisma.user.findUnique({
          where: { id: decodedUserToken.id },
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    expenseCategories: async (parent, { }, context) => {
      return context.prisma.expenseCategory.findMany({
        orderBy: { name: 'asc' },
      });
    },

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
      try {
        const expense: Expense | null = await context.prisma.expense.findFirst({
          where: { id },
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
          startingBalance: Yup.number()
            .test('is-positive', 'Starting balance must be positive or 0', (value) => {
              return (value ?? 0) >= 0;
            }),
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
        const userSchema = Yup.object({
          id: Yup.string().required('ID is required'),
          name: Yup.string(),
          picture: Yup.mixed<Promise<FileUpload>>(),
        });

        await userSchema.validate(user);

        const picturePath: string | undefined = await uploadFile(user.picture);

        const updatedUser: User = await context.prisma.user.update({
          where: { id: user.id },
          data: {
            name: user.name,
            picture: picturePath,
          },
        });

        return updatedUser.id;
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
            ...expenseCategory
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

    importExpenses: async (parent, { importData }, context) => {
      try {
        const importDataSchema = Yup.object({
          file: Yup.mixed<Promise<FileUpload>>().required('File is required'),
        });

        await importDataSchema.validate(importData);

        const filePath = await uploadFile(importData.file);
        if (!filePath) {
          throw new Error('File upload failed');
        }

        const file = XLSX.readFile(path.join(process.cwd(), filePath), { raw: true });
        const sheetName = file.SheetNames[0];
        const sheet = file.Sheets[sheetName];

        const rows: ExpenseImportRow[] = XLSX.utils.sheet_to_json<ExpenseImportRow>(sheet, { range: 6 })
          .filter((r: ExpenseImportRow) => r['Débito '] && r['Débito '].trim());

        const importedExpenses: Expense[] = await context.prisma.$transaction(
          rows.map((r: ExpenseImportRow) => {
            let category: string | undefined;
            if (importData.importCategories && r['Categoria ']) {
              category = r['Categoria '].trim();
            }

            return context.prisma.expense.create({
              data: {
                description: r['Descrição '].trim(),
                amount: parseNumber(r['Débito ']),
                date: parseDate(r['Data mov. ']),
                category: category
                  ? {
                    connectOrCreate: {
                      where: { name: category },
                      create: { name: category },
                    }
                  }
                  : undefined,
              },
            });
          })
        );

        return importedExpenses.map(e => e.id);
      } catch (ex) {
        throw handleException(ex);
      }
    },

    deleteAll: async (parent, { }, context) => {
      try {
        const transaction: BatchPayload[] = await context.prisma.$transaction([
          context.prisma.expense.deleteMany({}),
          context.prisma.expenseCategory.deleteMany({}),
        ]);

        return transaction.reduce((count, batch) => count + batch.count, 0);
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },

  Upload: GraphQLUpload,
};
