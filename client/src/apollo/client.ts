import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apollo = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});
