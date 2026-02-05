import DataLoader from 'dataloader';
import { PrismaClient } from '../../../generated/prisma/client';

export const expenseCategoryDeletableLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, boolean>(async (categoryIds: readonly string[]) => {
    const expenseCounts = await prisma.expense.groupBy({
      by: ['categoryId'],
      where: {
        categoryId: { in: [...categoryIds] },
      },
      _count: {
        id: true,
      },
    });

    const expenseCountsMap = new Map(
      expenseCounts.map(ec => [ec.categoryId!, ec._count.id ?? 0])
    );

    return categoryIds.map(id => (expenseCountsMap.get(id) ?? 0) === 0);
  });
};
