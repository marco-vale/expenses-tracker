import { ExpenseCategory, ExpenseType, PrismaClient } from '../../generated/prisma/client';
import { DashboardChartDataPoint, DashboardChartFilters } from '../graphql/__generated__/resolvers-types';

const getDashboardPieChart = async (userId: string, prisma: PrismaClient, filters?: DashboardChartFilters | null) => {
  const dashboardPieChart: DashboardChartDataPoint[] = [];
  const now: Date = new Date();

  const dashboardPieChartExpenseAmounts = await prisma.expense.groupBy({
    where: {
      userId,
      date: {
        gte: filters?.startDate ?? new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
        lte: filters?.endDate ?? undefined,
      },
      type: ExpenseType.EXPENSE,
    },
    by: ['categoryId'],
    _sum: { amount: true },
  });

  const expenseCategories: ExpenseCategory[] = await prisma.expenseCategory.findMany({
    where: { userId },
  });

  dashboardPieChartExpenseAmounts.forEach((pcea) => {
    const expensesAmountCategory: ExpenseCategory | undefined = expenseCategories.find((ec) => ec.id === pcea.categoryId);

    dashboardPieChart.push({
      label: expensesAmountCategory ? expensesAmountCategory.name : 'Uncategorized',
      value: pcea._sum.amount ?? 0,
    });
  });

  return dashboardPieChart;
};

export default getDashboardPieChart;
