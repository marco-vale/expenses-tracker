import { Card, CardActions, CardContent, CardHeader, CircularProgress, Stack } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React from 'react';
import { useDashboardChart } from '../hooks/useDashboardChart';
import { DashboardChartType } from '../graphql/__generated__/graphql';
import DashboardChartFiltersForm from './DashboardChartFiltersForm'
import { formatNumber } from '../tools/tools';

const DashboardPieChart: React.FC = () => {
  const {
    data,
    loading,
    filters,
    handleFiltersApply,
    handleFiltersClear,
  } = useDashboardChart({ type: DashboardChartType.Pie });

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardHeader
        title="Expenses Category Breakdown"
        slotProps={{ title: { variant: 'h6' } }}
      />
      <CardContent sx={{ width: '100%', aspectRatio: '16/9' }}>
        {loading ? (
          <Stack width="100%" marginTop="2rem" spacing={2} alignItems="center">
            <CircularProgress size={100} />
          </Stack>
        ) : (
          <PieChart
            series={[
              {
                data: (data?.dataPoints ?? []).map((dp, index) => ({
                  id: index,
                  label: dp.label ?? undefined,
                  value: Math.abs(dp.values[0]),
                })),
                valueFormatter: (item) => formatNumber(item.value),
              },
            ]}
            colors={[
              '#37474f',
              '#546e7a',
              '#78909c',
              '#90a4ae',
              '#b0bec5',
              '#cfd8dc',
            ]}
          />
        )}
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-end', mt: 'auto' }}>
        <DashboardChartFiltersForm
          dashboardChartFilters={filters}
          handleFiltersApply={handleFiltersApply}
          handleFiltersClear={handleFiltersClear}
        />
      </CardActions>
    </Card>
  );
};

export default DashboardPieChart;
