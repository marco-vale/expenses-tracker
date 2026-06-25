import { User } from '../../../../generated/prisma/client';
import { DashboardChartType, type Resolvers } from '../../__generated__/resolvers-types';
import type { GraphQLContext } from '../../context';
import * as Yup from 'yup';
import handleException from '../../../helpers/handleException';
import checkAuth from '../../../helpers/checkAuth';
import getDashboardBarChart from '../../../helpers/getDashboardBarChart';
import getDashboardPieChart from '../../../helpers/getDashboardPieChart';
import { yupDateValidation } from '../../../validations/validations';

export const dashboardResolvers: Resolvers<GraphQLContext> = {
  Query: {
    dashboardChart: async (parent, { type, filters }, context) => {
      try {
        const user: User = checkAuth(context);

        const dashboardChartFiltersSchema = Yup.object({
          startDate: yupDateValidation,
          endDate: yupDateValidation,
        });

        await dashboardChartFiltersSchema.validate(filters);

        if (type === DashboardChartType.Bar) {
          return getDashboardBarChart(user.id, context.prisma, filters);
        }

        if (type === DashboardChartType.Pie) {
          return getDashboardPieChart(user.id, context.prisma, filters);
        }

        throw new Error('Invalid chart type');
      } catch (ex) {
        throw handleException(ex);
      }
    },
  },
};
