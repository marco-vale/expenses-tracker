import { User } from '../../generated/prisma/client.js';

const checkAuth = (user: User | null): User => {
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
};

export default checkAuth;
