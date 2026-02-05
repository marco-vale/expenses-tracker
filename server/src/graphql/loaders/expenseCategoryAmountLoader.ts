import DataLoader from 'dataloader';
import { PrismaClient } from '../../../generated/prisma/client';

export const expenseCategoryAmountLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, number>(async (categoryIds: readonly string[]) => {
    const expenseAmounts = await prisma.expense.groupBy({
      by: ['categoryId'],
      where: {
        categoryId: { in: [...categoryIds] },
      },
      _sum: {
        amount: true,
      },
    });

    const expenseAmountsMap = new Map(
      expenseAmounts.map(ea => [ea.categoryId!, ea._sum.amount ?? 0])
    );

    return categoryIds.map(id => expenseAmountsMap.get(id) ?? 0);
  });
};
