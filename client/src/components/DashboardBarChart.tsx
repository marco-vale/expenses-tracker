import { Card, CardActions, CardContent, CardHeader, CircularProgress, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React from 'react';
import { DashboardChartType } from '../graphql/__generated__/graphql';
import { useDashboardChart } from '../hooks/useDashboardChart';
import DashboardChartFiltersForm from './DashboardChartFiltersForm';
import { formatNumber } from '../tools/tools';

const DashboardBarChart: React.FC = () => {
  const {
    data,
    loading,
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
        {loading ? (
          <Stack width="100%" marginTop="2rem" spacing={2} alignItems="center">
            <CircularProgress size={100} />
          </Stack>
        ) : (
          filters?.showCategories ? (
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: data?.labels ?? [],
                  height: 28,
                },
              ]}
              series={(data?.dataPoints ?? []).map(dp => ({
                label: dp.label ?? undefined,
                data: dp.values.map(dv => Math.abs(dv)),
                valueFormatter: (item) => formatNumber(item),
                stack: 'total',
              }))}
              grid={{ horizontal: true }}
              colors={[
                '#37474f',
                '#546e7a',
                '#78909c',
                '#90a4ae',
                '#b0bec5',
                '#cfd8dc',
              ]}
              slotProps={{
                legend: {
                  direction: 'vertical',
                  position: { vertical: 'middle', horizontal: 'end' },
                },
              }}
            />
          ) : (
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: data?.labels ?? [],
                  height: 28,
                },
              ]}
              series={[{
                data: data?.dataPoints.map(dp => Math.abs(dp.values[0])) ?? [],
                valueFormatter: (item) => formatNumber(item),
              }]}
              grid={{ horizontal: true }}
              colors={['#37474f']}
            />
          )
        )}
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-end', mt: 'auto' }}>
        <DashboardChartFiltersForm
          dashboardChartFilters={filters}
          enableShowCategoriesFilter
          handleFiltersApply={handleFiltersApply}
          handleFiltersClear={handleFiltersClear}
        />
      </CardActions>
    </Card>
  );
};

export default DashboardBarChart;
