import { ExpenseCategory, User } from '../../../../generated/prisma/client.js';
import { ExpenseCategoryWhereInput } from '../../../../generated/prisma/internal/prismaNamespace.js';
import type { Resolvers } from '../../__generated__/resolvers-types.js';
import type { GraphQLContext } from '../../context.js';
import * as Yup from 'yup';
import handleException from '../../../helpers/handleException.js';
import checkAuth from '../../../helpers/checkAuth.js';
import getPrismaArgsFromQueryOptions from '../../../helpers/getPrismaArgsFromQueryOptions.js';

export const expenseCategoryResolvers: Resolvers<GraphQLContext> = {
  Query: {
    expenseCategories: async (parent, { filters, options }, context) => {
      try {
        const user: User = checkAuth(context.user);

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
            ...getPrismaArgsFromQueryOptions(options, ['name']),
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
        const user: User = checkAuth(context.user);

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
        const user: User = checkAuth(context.user);

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
        const user: User = checkAuth(context.user);

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
