import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import type { Resolvers } from '../../__generated__/resolvers-types';
import type { GraphQLContext } from '../../context';

export const commonResolvers: Resolvers<GraphQLContext> = {
  Upload: GraphQLUpload,
};
