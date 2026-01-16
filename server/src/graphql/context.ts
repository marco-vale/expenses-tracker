import { PrismaClient } from '../../generated/prisma/client';

export type GraphQLContext = {
  prisma: PrismaClient;
};
