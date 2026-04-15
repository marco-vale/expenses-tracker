import { QueryOptions } from '../graphql/__generated__/resolvers-types';

const getPrismaArgsFromQueryOptions = (options?: QueryOptions | null): any | undefined => {
  if (!options) {
    return undefined;
  }

  const prismaArgs: any = {};

  if (options.page && options.rowsPerPage) {
    prismaArgs.skip = options.page * options.rowsPerPage;
    prismaArgs.take = options.rowsPerPage;
  }

  if (options.orderBy) {
    prismaArgs.orderBy = {
      [options.orderBy]: options.orderDirection ?? 'asc',
    };
  }

  return prismaArgs;
};

export default getPrismaArgsFromQueryOptions;
