import { Expense, ExpenseType, PrismaClient } from '../../generated/prisma/client';
import { DashboardChart, DashboardChartDataPoint, DashboardChartFilters } from '../graphql/__generated__/resolvers-types';
import { parseDateString } from '../tools/tools';

type DashboardBarChartDataPointCategories = {
  label: string;
  values: Record<string, number>;
};

const buildDashboardBarChart = (expenses: any[]): DashboardChart => {
  const dashboardBarChartLabels: Set<string> = new Set();
  const dashboardBarChart: Record<string, DashboardChartDataPoint> = {};

  expenses.forEach((e) => {
    dashboardBarChartLabels.add(e.date.toLocaleString('default', { month: 'long' }));

    const eIndex: string = e.date.getFullYear() + '-' + e.date.getMonth();
    if (!dashboardBarChart[eIndex]) {
      dashboardBarChart[eIndex] = {
        values: [0],
      };
    }

    dashboardBarChart[eIndex].values[0] += e.amount;
  });

  return {
    labels: Array.from(dashboardBarChartLabels),
    dataPoints: Object.values(dashboardBarChart),
  };
};

const buildDashboardBarChartCategories = (expenses: any[]): DashboardChart => {
  const dashboardBarChartLabels: Set<string> = new Set();
  const dashboardBarChartCategories: Record<string, DashboardBarChartDataPointCategories> = {};

  expenses.forEach((e) => {
    dashboardBarChartLabels.add(e.date.toLocaleString('default', { month: 'long' }));

    const eIndex: string = e.categoryId ?? '';
    if (!dashboardBarChartCategories[eIndex]) {
      dashboardBarChartCategories[eIndex] = {
        label: e.category?.name ?? 'Uncategorized',
        values: {},
      };
    }

    const eDateIndex: string = e.date.getFullYear() + '-' + e.date.getMonth();
    if (!dashboardBarChartCategories[eIndex].values[eDateIndex]) {
      dashboardBarChartCategories[eIndex].values[eDateIndex] = 0;
    }

    dashboardBarChartCategories[eIndex].values[eDateIndex] += e.amount;
  });

  return {
    labels: Array.from(dashboardBarChartLabels),
    dataPoints: Object.values(dashboardBarChartCategories).map(dbcc => ({
      label: dbcc.label,
      values: Object.values(dbcc.values),
    })),
  };
};

const getDashboardBarChart = async (userId: string, prisma: PrismaClient, filters?: DashboardChartFilters | null): Promise<DashboardChart> => {
  const dashboardBarChartExpenses = await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: filters?.startDate ? parseDateString(filters.startDate) : undefined,
        lte: filters?.endDate ? parseDateString(filters.endDate) : undefined,
      },
      type: ExpenseType.EXPENSE,
    },
    include: { category: true },
    orderBy: filters?.showCategories ? [{ categoryId: 'asc' }, { date: 'asc' }] : { date: 'asc' },
  });

  return filters?.showCategories
    ? buildDashboardBarChartCategories(dashboardBarChartExpenses)
    : buildDashboardBarChart(dashboardBarChartExpenses);
};

export default getDashboardBarChart;
