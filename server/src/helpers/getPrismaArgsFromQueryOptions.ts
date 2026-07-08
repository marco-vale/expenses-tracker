import { OrderDirection, QueryOptions } from '../graphql/__generated__/resolvers-types.js';

type PrismaQueryArgs = {
  orderBy?: Record<string, OrderDirection>;
  skip?: number;
  take?: number;
};

/**
 * Converts pagination/sorting query options into Prisma args.
 *
 * `orderBy` is validated against `allowedOrderByFields` to prevent arbitrary
 * client-supplied fields from reaching Prisma; unknown fields are ignored.
 */
const getPrismaArgsFromQueryOptions = (
  options?: QueryOptions | null,
  allowedOrderByFields: string[] = [],
): PrismaQueryArgs | undefined => {
  if (!options) {
    return undefined;
  }

  const prismaArgs: PrismaQueryArgs = {};

  if (options.orderBy && allowedOrderByFields.includes(options.orderBy)) {
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
