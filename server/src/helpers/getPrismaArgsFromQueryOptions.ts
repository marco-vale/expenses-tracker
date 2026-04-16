import { OrderDirection, QueryOptions } from '../graphql/__generated__/resolvers-types';

const getPrismaArgsFromQueryOptions = (options?: QueryOptions | null): any | undefined => {
  if (!options) {
    return undefined;
  }

  const prismaArgs: any = {};

  if (options.orderBy) {
    prismaArgs.orderBy = {
      [options.orderBy]: options.orderDirection ?? OrderDirection.Asc,
    };
  }

  if (typeof options.page === 'number' && typeof options.rowsPerPage === 'number') {
    prismaArgs.skip = options.page * options.rowsPerPage;
    prismaArgs.take = options.rowsPerPage;
  }

  return prismaArgs;
};

export default getPrismaArgsFromQueryOptions;
