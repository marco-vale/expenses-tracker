import DataLoader from 'dataloader';
import { PrismaClient } from '../../../generated/prisma/client';

export const expenseCategoryAmountLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, number>(async (categoryIds: readonly string[]) => {
    const amounts = await prisma.expense.groupBy({
      by: ['categoryId'],
      where: {
        categoryId: { in: [...categoryIds] },
      },
      _sum: {
        amount: true,
      },
    });

    const amountsMap = new Map(
      amounts.map(eca => [eca.categoryId!, eca._sum.amount ?? 0])
    );

    return categoryIds.map(id => amountsMap.get(id) ?? 0);
  });
};
