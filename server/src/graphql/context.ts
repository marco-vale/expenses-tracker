import { PrismaClient } from '../../generated/prisma/client';
import { expenseCategoryAmountLoader } from './loaders/expenseCategoryAmountLoader';
import { expenseCategoryDeletableLoader } from './loaders/expenseCategoryDeletableLoader';

export type GraphQLContext = {
  prisma: PrismaClient;
  loaders: {
    expenseCategoryAmount: ReturnType<typeof expenseCategoryAmountLoader>;
    expenseCategoryDeletable: ReturnType<typeof expenseCategoryDeletableLoader>;
  };
};
