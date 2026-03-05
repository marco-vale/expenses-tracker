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
  expressMiddleware(apollo, {
    context: async () => ({
      prisma,
      loaders: {
        expenseCategoryAmount: expenseCategoryAmountLoader(prisma),
        expenseCategoryDeletable: expenseCategoryDeletableLoader(prisma),
      },
    }),
  }),
);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`GraphQL ready at http://localhost:${port}/graphql`);
});
