import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import type { Resolvers } from '../../__generated__/resolvers-types.js';
import type { GraphQLContext } from '../../context.js';

export const commonResolvers: Resolvers<GraphQLContext> = {
  Upload: GraphQLUpload,
};
