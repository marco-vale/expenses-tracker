import { User } from '../../generated/prisma/client';
import { GraphQLContext } from '../graphql/context';

const checkAuth = (context: GraphQLContext): User => {
  if (!context.user) {
    throw new Error('Unauthorized');
  }

  return context.user;
};

export default checkAuth;
