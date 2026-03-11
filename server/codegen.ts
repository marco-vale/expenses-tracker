import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  generates: {
    './src/graphql/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        contextType: './src/graphql/context.ts#GraphQLContext',
        enumValues: {
          ExpenseType: './generated/prisma/client#ExpenseType',
        }
      },
    },
  },
  config: {
    scalars: {
      Upload: 'FileUpload',
    },
  },
};

export default config;
