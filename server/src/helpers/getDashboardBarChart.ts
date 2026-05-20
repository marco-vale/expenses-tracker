import { Expense, ExpenseType, PrismaClient } from '../../generated/prisma/client';
import { DashboardChartDataPoint, DashboardChartFilters } from '../graphql/__generated__/resolvers-types';

const getDateIndex = (date: Date): string => {
  return date.getFullYear() + '-' + date.getMonth();
};

const getDashboardBarChart = async (userId: string, prisma: PrismaClient, filters?: DashboardChartFilters | null): Promise<DashboardChartDataPoint[]> => {
  const dashboardBarChart: Record<string, DashboardChartDataPoint> = {};
  const now: Date = new Date();

  const startDate: string = filters?.startDate ?? new Date(now.getFullYear(), 0, 1).toISOString();
  const endDate: string = filters?.endDate ?? now.toISOString();

  const indexDate: Date = new Date(startDate);
  const indexEndDate: Date = new Date(endDate);

  while (indexDate <= indexEndDate) {
    dashboardBarChart[getDateIndex(indexDate)] = {
      label: indexDate.toLocaleString('default', { month: 'long' }),
      value: 0,
    };

    indexDate.setMonth(indexDate.getMonth() + 1);
  }

  const dashboardBarChartExpenses: Expense[] = await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
      type: ExpenseType.EXPENSE,
    },
  });

  dashboardBarChartExpenses.forEach((dbce) => {
    dashboardBarChart[getDateIndex(dbce.date)].value += dbce.amount;
  });

  return Object.values(dashboardBarChart);
};

export default getDashboardBarChart;
