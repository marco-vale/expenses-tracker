import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
   schema: 'http://localhost:3001/graphql',
   documents: ['src/**/*.ts'],
   generates: {
      './src/gql/': {
        preset: 'client',
      }
   }
};

export default config;
