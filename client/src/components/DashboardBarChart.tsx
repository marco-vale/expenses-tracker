import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React from 'react';
import { DashboardChartType } from '../graphql/__generated__/graphql';
import { useDashboardChart } from '../hooks/useDashboardChart';
import DashboardChartFiltersForm from './DashboardChartFiltersForm';
import { formatNumber } from '../tools/tools';

const DashboardBarChart: React.FC = () => {
  const {
    data,
    filters,
    handleFiltersApply,
    handleFiltersClear,
  } = useDashboardChart({ type: DashboardChartType.Bar });

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardHeader
        title="Expenses Overview"
        slotProps={{ title: { variant: 'h6' } }}
      />
      <CardContent sx={{ width: '100%', aspectRatio: '16/9' }}>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: data.map(dbc => dbc.label),
              height: 28,
            },
          ]}
          series={[
            {
              data: data.map(dbc => Math.abs(dbc.value)),
              valueFormatter: (item) => formatNumber(item),
            },
          ]}
          grid={{ horizontal: true }}
          colors={['#37474f']}
        />
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

export default DashboardBarChart;
