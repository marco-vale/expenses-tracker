import { User } from '../../../../generated/prisma/client.js';
import type { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import type { Resolvers } from '../../__generated__/resolvers-types.js';
import type { GraphQLContext } from '../../context.js';
import * as Yup from 'yup';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import handleException from '../../../helpers/handleException.js';
import checkAuth from '../../../helpers/checkAuth.js';
import uploadFile from '../../../helpers/uploadFile.js';
import { yupNumberPositiveOrZeroValidation } from '../../../validations/validations.js';

export const authResolvers: Resolvers<GraphQLContext> = {
  Query: {
    me: async (parent, { }, context) => {
      try {
        return checkAuth(context.user);
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },

  User: {
    startingBalanceEditable: async (parent, { }, context) => {
      return context.loaders.userStartingBalanceEditable.load(parent.id);
    },
  },

  Mutation: {
    login: async (parent, { login }, context) => {
      try {
        const loginSchema = Yup.object({
          email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
          password: Yup.string().required('Password is required'),
        });

        await loginSchema.validate(login);

        const existingUser: User | null = await context.prisma.user.findUnique({
          where: { email: login.email },
        });

        if (!existingUser) {
          throw new Error('Invalid e-mail or password');
        }

        const passwordValid: boolean = await argon2.verify(
          existingUser.password,
          login.password,
        );

        if (!passwordValid) {
          throw new Error('Invalid e-mail or password');
        }

        const userToken: string = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email,
          },
          process.env.JWT_SECRET!,
          { expiresIn: '4h' }
        );

        return userToken;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    createUser: async (parent, { user }, context) => {
      try {
        const userSchema = Yup.object({
          email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
          password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
          name: Yup.string(),
          picture: Yup.mixed<Promise<FileUpload>>(),
          startingBalance: yupNumberPositiveOrZeroValidation,
        });

        await userSchema.validate(user);

        const hashedPassword: string = await argon2.hash(user.password);
        const picturePath: string | undefined = await uploadFile(user.picture);

        const newUser: User = await context.prisma.user.create({
          data: {
            email: user.email,
            password: hashedPassword,
            name: user.name,
            picture: picturePath,
            startingBalance: user.startingBalance ?? 0,
          },
        });

        return newUser.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },

    updateUser: async (parent, { user }, context) => {
      try {
        const currentUser: User = checkAuth(context.user);

        const userSchema = Yup.object({
          name: Yup.string(),
          picture: Yup.mixed<Promise<FileUpload>>(),
          startingBalance: yupNumberPositiveOrZeroValidation,
        });

        await userSchema.validate(user);

        const picturePath: string | undefined = await uploadFile(user.picture);

        const updatedUser: User = await context.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            name: user.name,
            picture: picturePath,
            startingBalance: user.startingBalance ?? undefined,
          },
        });

        return updatedUser.id;
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },
};
