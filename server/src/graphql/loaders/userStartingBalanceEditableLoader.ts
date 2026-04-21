import DataLoader from 'dataloader';
import { GraphQLContext } from '../context';
import handleException from '../../helpers/handleException';

export const userStartingBalanceEditableLoader = (context: GraphQLContext) => {
  return new DataLoader<string, boolean>(async (userIds: readonly string[]) => {
    try {
      const expenseCountsByUser = await context.prisma.expense.groupBy({
        by: ['userId'],
        where: {
          userId: { in: [...userIds] },
        },
        _count: { id: true },
      });

      return userIds.map(uid => (expenseCountsByUser.find(ec => ec.userId === uid)?._count.id ?? 0) === 0);
    } catch (ex) {
      throw handleException(ex);
    }
  });
};
