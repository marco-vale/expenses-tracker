import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { prisma } from './prisma/client.js';
import { expressMiddleware } from '@as-integrations/express5';
import { expenseCategoryAmountLoader } from './graphql/loaders/expenseCategoryAmountLoader.js';
import { expenseCategoryDeletableLoader } from './graphql/loaders/expenseCategoryDeletableLoader.js';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import path from 'path';
import { GraphQLContext } from './graphql/context.js';
import { User } from '../generated/prisma/client.js';
import getUserByUserToken from './helpers/getUserByToken.js';
import handleException from './helpers/handleException.js';
import { userStartingBalanceEditableLoader } from './graphql/loaders/userStartingBalanceEditableLoader.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const app = express();
app.use(express.json());

// allow the Vite dev server by default
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);

app.get('/health', (_req, res) => {
  res.json({ ok: true })
});

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

await apollo.start();

app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 }));

app.use(
  '/graphql',
  expressMiddleware<GraphQLContext>(apollo, {
    context: async ({ req }) => {
      let user: User | null = null;

      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        try {
          user = await getUserByUserToken(authHeader.substring(7), prisma);
        } catch (ex) {
          throw handleException(ex);
        }
      }

      const context: GraphQLContext = {
        prisma,
        user,
        loaders: {
          userStartingBalanceEditable: userStartingBalanceEditableLoader(prisma),
          expenseCategoryAmount: expenseCategoryAmountLoader(prisma, user),
          expenseCategoryDeletable: expenseCategoryDeletableLoader(prisma, user),
        },
      };

      return context;
    },
  }),
);

// Uploaded files are private: only the authenticated owner may read them.
app.use(
  '/uploads',
  async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
      if (!token) {
        res.status(401).end();
        return;
      }

      const requestingUser: User = await getUserByUserToken(token, prisma);

      if (requestingUser.picture !== `/uploads${req.path}`) {
        res.status(403).end();
        return;
      }

      next();
    } catch {
      res.status(401).end();
    }
  },
  express.static(path.join(process.cwd(), 'uploads')),
);

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`GraphQL ready at http://localhost:${port}/graphql`);
});
