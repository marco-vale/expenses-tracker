import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
   schema: 'http://localhost:3001/graphql',
   documents: ['src/**/*.graphql'],
   generates: {
      './src/graphql/__generated__/graphql.ts': {
        plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
         config: {
            useTypeImports: true,
         },
      }
   },
   config: {
    scalars: {
      Upload: 'File',
    },
  },
};

export default config;
