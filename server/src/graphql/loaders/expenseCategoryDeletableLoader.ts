import DataLoader from 'dataloader';
import handleException from '../../helpers/handleException';
import { GraphQLContext } from '../context';
import { User } from '../__generated__/resolvers-types';
import checkAuth from '../../helpers/checkAuth';

export const expenseCategoryDeletableLoader = (context: GraphQLContext) => {
  return new DataLoader<string, boolean>(async (categoryIds: readonly string[]) => {
    try {
      const user: User = checkAuth(context);

      const expenseCountsByCategory = await context.prisma.expense.groupBy({
        by: ['categoryId'],
        where: {
          categoryId: { in: [...categoryIds] },
          userId: user.id,
        },
        _count: { id: true },
      });

      return categoryIds.map(cid => (expenseCountsByCategory.find(ec => ec.categoryId === cid)?._count.id ?? 0) === 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
