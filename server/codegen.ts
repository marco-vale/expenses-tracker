import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  generates: {
    './src/graphql/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        contextType: './src/graphql/context.ts#GraphQLContext',
      },
    },
  },
};

export default config;
