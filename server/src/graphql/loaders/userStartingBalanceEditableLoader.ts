import DataLoader from 'dataloader';
import handleException from '../../helpers/handleException.js';
import { PrismaClient } from '../../../generated/prisma/client.js';

export const userStartingBalanceEditableLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, boolean>(async (userIds: readonly string[]) => {
    try {
      const expenseCountsByUser = await prisma.expense.groupBy({
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
