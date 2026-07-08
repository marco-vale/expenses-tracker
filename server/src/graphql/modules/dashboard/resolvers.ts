import { User } from '../../../../generated/prisma/client.js';
import { DashboardChartType, type Resolvers } from '../../__generated__/resolvers-types.js';
import type { GraphQLContext } from '../../context.js';
import * as Yup from 'yup';
import handleException from '../../../helpers/handleException.js';
import checkAuth from '../../../helpers/checkAuth.js';
import getDashboardBarChart from '../../../helpers/getDashboardBarChart.js';
import getDashboardPieChart from '../../../helpers/getDashboardPieChart.js';
import { yupDateValidation } from '../../../validations/validations.js';

export const dashboardResolvers: Resolvers<GraphQLContext> = {
  Query: {
    dashboardChart: async (parent, { type, filters }, context) => {
      try {
        const user: User = checkAuth(context.user);

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
