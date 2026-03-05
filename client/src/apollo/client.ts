import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/UploadHttpLink.mjs';

export const apollo = new ApolloClient({
  link: new createUploadLink({
    uri: "http://localhost:3001/graphql",
    headers: {
      'apollo-require-preflight': 'true',
    },
  }),
  cache: new InMemoryCache(),
});
