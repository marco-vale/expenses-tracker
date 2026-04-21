import { ApolloClient, ApolloLink, CombinedGraphQLErrors, CombinedProtocolErrors, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/UploadHttpLink.mjs';
import { LOCALSTORAGE_USERTOKEN_KEY } from '../constants/constants';

const authLink: SetContextLink = new SetContextLink(({ headers }) => {
  const userToken = localStorage.getItem(LOCALSTORAGE_USERTOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : '',
    }
  }
});

const errorLink: ErrorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      )
    );
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

const uploadLink: createUploadLink = new createUploadLink({
  uri: "http://localhost:3001/graphql",
  headers: {
    'apollo-require-preflight': 'true',
  },
});

export const apollo = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    errorLink,
    uploadLink
  ]),
  cache: new InMemoryCache(),
});
