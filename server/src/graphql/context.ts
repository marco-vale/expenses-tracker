import { PrismaClient } from '../../generated/prisma/client';
import { expenseCategoryAmountLoader } from './loaders/expenseCategoryAmountLoader';

export type GraphQLContext = {
  prisma: PrismaClient;
  loaders: {
    expenseCategoryAmount: ReturnType<typeof expenseCategoryAmountLoader>;
  };
};
