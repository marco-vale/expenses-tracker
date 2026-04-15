import DataLoader from 'dataloader';
import { PrismaClient } from '../../../generated/prisma/client';
import handleException from '../../helpers/handleException';

export const expenseCategoryAmountLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, number>(async (categoryIds: readonly string[]) => {
    try {
      const expenseAmountsByCategory = await prisma.expense.groupBy({
        by: ['categoryId'],
        where: {
          categoryId: { in: [...categoryIds] },
        },
        _sum: { amount: true },
      });

      return categoryIds.map(cid => expenseAmountsByCategory.find(eac => eac.categoryId === cid)?._sum.amount ?? 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
