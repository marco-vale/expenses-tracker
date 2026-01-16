import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { prisma } from './prisma/client.js';
import { expressMiddleware } from '@as-integrations/express5';

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
  typeDefs: typeDefs,
  resolvers: resolvers,
});

await apollo.start();

app.use(
  '/graphql',
  expressMiddleware(apollo, {
    context: async () => ({ prisma }),
  }),
);

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`GraphQL ready at http://localhost:${port}/graphql`);
});
