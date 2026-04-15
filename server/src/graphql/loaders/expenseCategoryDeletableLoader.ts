import DataLoader from 'dataloader';
import { PrismaClient } from '../../../generated/prisma/client';
import handleException from '../../helpers/handleException';

export const expenseCategoryDeletableLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, boolean>(async (categoryIds: readonly string[]) => {
    try {
      const expenseCountsByCategory = await prisma.expense.groupBy({
        by: ['categoryId'],
        where: {
          categoryId: { in: [...categoryIds] },
        },
        _count: { id: true },
      });

      return categoryIds.map(cid => (expenseCountsByCategory.find(ec => ec.categoryId === cid)?._count.id ?? 0) === 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
