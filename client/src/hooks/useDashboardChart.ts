import { useState } from 'react';
import { GetDashboardChartDocument, type DashboardChartFilters, type DashboardChartType, type GetDashboardChartQuery, type GetDashboardChartQueryVariables } from '../graphql/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

type UseDashboardChartParams = {
  type: DashboardChartType;
};

/**
 * Custom hook to manage a single dashboard chart's data and filters.
 *
 * @param params - The initial parameters for the chart state
 * @param params.type - The type of chart (Bar, Pie, etc.)
 *
 * @returns An object containing:
 * @returns {DashboardChartDataPoint[]} data - The chart data points
 * @returns {DashboardChartFilters | undefined} filters - The current filters applied to the chart (if any)
 * @returns {Function} handleFiltersApply - Function to apply filters to the chart
 * @returns {Function} handleFiltersClear - Function to clear filters
 */
export const useDashboardChart = (params: UseDashboardChartParams) => {
  const [filters, setFilters] = useState<DashboardChartFilters>();

  const { data } = useQuery<GetDashboardChartQuery, GetDashboardChartQueryVariables>(
    GetDashboardChartDocument,
    {
      variables: {
        type: params.type,
        filters,
      },
      fetchPolicy: 'network-only',
    },
  );

  const handleFiltersApply = (filters?: DashboardChartFilters) => {
    setFilters(filters);
  };

  const handleFiltersClear = () => {
    setFilters(undefined);
  };

  return {
    data: data?.dashboardChart ?? [],
    filters,
    handleFiltersApply,
    handleFiltersClear,
  };
};
