import DataLoader from 'dataloader';
import handleException from '../../helpers/handleException.js';
import { PrismaClient, User } from '../../../generated/prisma/client.js';
import checkAuth from '../../helpers/checkAuth.js';

export const expenseCategoryDeletableLoader = (prisma: PrismaClient, user: User | null) => {
  return new DataLoader<string, boolean>(async (categoryIds: readonly string[]) => {
    try {
      const authedUser = checkAuth(user);

      const expenseCountsByCategory = await prisma.expense.groupBy({
        by: ['categoryId'],
        where: {
          categoryId: { in: [...categoryIds] },
          userId: authedUser.id,
        },
        _count: { id: true },
      });

      return categoryIds.map(cid => (expenseCountsByCategory.find(ec => ec.categoryId === cid)?._count.id ?? 0) === 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
