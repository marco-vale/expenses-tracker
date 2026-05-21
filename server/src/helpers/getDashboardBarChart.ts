import { Expense, ExpenseType, PrismaClient } from '../../generated/prisma/client';
import { DashboardChartDataPoint, DashboardChartFilters } from '../graphql/__generated__/resolvers-types';
import { parseDateString } from '../tools/tools';

const getDashboardBarChart = async (userId: string, prisma: PrismaClient, filters?: DashboardChartFilters | null): Promise<DashboardChartDataPoint[]> => {
  const dashboardBarChart: Record<string, DashboardChartDataPoint> = {};

  const dashboardBarChartExpenses: Expense[] = await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: filters?.startDate ? parseDateString(filters.startDate) : undefined,
        lte: filters?.endDate ? parseDateString(filters.endDate) : undefined,
      },
      type: ExpenseType.EXPENSE,
    },
    orderBy: { date: 'asc' },
  });

  dashboardBarChartExpenses.forEach((dbce) => {
    const dbceIndex: string = dbce.date.getFullYear() + '-' + dbce.date.getMonth();

    if (!dashboardBarChart[dbceIndex]) {
      dashboardBarChart[dbceIndex] = {
        label: dbce.date.toLocaleString('default', { month: 'long' }),
        value: 0,
      };
    }

    dashboardBarChart[dbceIndex].value += dbce.amount;
  });

  return Object.values(dashboardBarChart);
};

export default getDashboardBarChart;
