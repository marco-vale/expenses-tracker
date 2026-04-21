import DataLoader from 'dataloader';
import { User } from '../../../generated/prisma/client';
import handleException from '../../helpers/handleException';
import checkAuth from '../../helpers/checkAuth';
import { GraphQLContext } from '../context';

export const expenseCategoryAmountLoader = (context: GraphQLContext) => {
  return new DataLoader<string, number>(async (categoryIds: readonly string[]) => {
    try {
      const user: User = checkAuth(context);

      const expenseAmountsByCategory = await context.prisma.expense.groupBy({
        by: ['categoryId'],
        where: {
          categoryId: { in: [...categoryIds] },
          userId: user.id,
        },
        _sum: { amount: true },
      });

      return categoryIds.map(cid => expenseAmountsByCategory.find(eac => eac.categoryId === cid)?._sum.amount ?? 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
