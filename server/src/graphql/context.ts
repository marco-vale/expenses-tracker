import { PrismaClient, User } from '../../generated/prisma/client.js';
import { expenseCategoryAmountLoader } from './loaders/expenseCategoryAmountLoader.js';
import { expenseCategoryDeletableLoader } from './loaders/expenseCategoryDeletableLoader.js';
import { userStartingBalanceEditableLoader } from './loaders/userStartingBalanceEditableLoader.js';

export type GraphQLContext = {
  prisma: PrismaClient;
  user: User | null;
  loaders: {
    userStartingBalanceEditable: ReturnType<typeof userStartingBalanceEditableLoader>;
    expenseCategoryAmount: ReturnType<typeof expenseCategoryAmountLoader>;
    expenseCategoryDeletable: ReturnType<typeof expenseCategoryDeletableLoader>;
  };
};
