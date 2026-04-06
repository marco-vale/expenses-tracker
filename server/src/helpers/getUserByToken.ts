import { PrismaClient, User } from '../../generated/prisma/client';
import jwt from 'jsonwebtoken';
import { UserToken } from '../types/types';

const getUserByUserToken = async (userToken: string, prisma: PrismaClient): Promise<User> => {
  const decodedUserToken = jwt.verify(userToken, process.env.JWT_SECRET!) as UserToken;

  const user: User | null = await prisma.user.findUnique({
    where: { id: decodedUserToken.id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export default getUserByUserToken;
