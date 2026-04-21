import { PrismaClient, User } from '../../generated/prisma/client';
import { expenseCategoryAmountLoader } from './loaders/expenseCategoryAmountLoader';
import { expenseCategoryDeletableLoader } from './loaders/expenseCategoryDeletableLoader';
import { userStartingBalanceEditableLoader } from './loaders/userStartingBalanceEditableLoader';

export type GraphQLContext = {
  prisma: PrismaClient;
  user: User | null;
  loaders: {
    userStartingBalanceEditable: ReturnType<typeof userStartingBalanceEditableLoader>;
    expenseCategoryAmount: ReturnType<typeof expenseCategoryAmountLoader>;
    expenseCategoryDeletable: ReturnType<typeof expenseCategoryDeletableLoader>;
  };
};
