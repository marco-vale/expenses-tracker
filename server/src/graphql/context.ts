import { PrismaClient, User } from '../../generated/prisma/client';
import { expenseCategoryAmountLoader } from './loaders/expenseCategoryAmountLoader';
import { expenseCategoryDeletableLoader } from './loaders/expenseCategoryDeletableLoader';

export type GraphQLContext = {
  prisma: PrismaClient;
  user: User | null;
  loaders: {
    expenseCategoryAmount: ReturnType<typeof expenseCategoryAmountLoader>;
    expenseCategoryDeletable: ReturnType<typeof expenseCategoryDeletableLoader>;
  };
};
