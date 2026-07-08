import DataLoader from 'dataloader';
import { PrismaClient, User } from '../../../generated/prisma/client.js';
import handleException from '../../helpers/handleException.js';
import checkAuth from '../../helpers/checkAuth.js';

export const expenseCategoryAmountLoader = (prisma: PrismaClient, user: User | null) => {
  return new DataLoader<string, number>(async (categoryIds: readonly string[]) => {
    try {
      const authedUser = checkAuth(user);

      const expenseAmountsByCategory = await prisma.expense.groupBy({
        by: ['categoryId'],
        where: {
          categoryId: { in: [...categoryIds] },
          userId: authedUser.id,
        },
        _sum: { amount: true },
      });

      return categoryIds.map(cid => expenseAmountsByCategory.find(eac => eac.categoryId === cid)?._sum.amount ?? 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
