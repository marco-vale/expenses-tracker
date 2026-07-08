import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  generates: {
    './src/graphql/__generated__/resolvers-types.ts': {
      plugins: [
        { add: { content: "import type { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';" } },
        'typescript',
        'typescript-resolvers',
      ],
      config: {
        useTypeImports: true,
        // Paths are emitted verbatim, so they must be relative to this output file
        // and carry the .js extension required by Node ESM at runtime.
        contextType: '../context.js#GraphQLContext',
        enumValues: {
          ExpenseType: '../../../generated/prisma/client.js#ExpenseType',
        }
      },
    },
  },
  config: {
    scalars: {
      // graphql-upload resolves an Upload to a Promise<FileUpload>.
      Upload: 'Promise<FileUpload>',
    },
  },
};

export default config;
