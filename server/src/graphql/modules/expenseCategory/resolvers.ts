import { ExpenseCategory, User } from '../../../../generated/prisma/client';
import { ExpenseCategoryWhereInput } from '../../../../generated/prisma/internal/prismaNamespace';
import type { Resolvers } from '../../__generated__/resolvers-types';
import type { GraphQLContext } from '../../context';
import * as Yup from 'yup';
import handleException from '../../../helpers/handleException';
import checkAuth from '../../../helpers/checkAuth';
import getPrismaArgsFromQueryOptions from '../../../helpers/getPrismaArgsFromQueryOptions';

export const expenseCategoryResolvers: Resolvers<GraphQLContext> = {
  Query: {
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
  },
};
