import { Card, CardContent, CardHeader } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React from 'react';
import { DashboardChartType } from '../graphql/__generated__/graphql';
import { useDashboardChart } from '../hooks/useDashboardChart';

const DashboardBarChart: React.FC = () => {
  const { data } = useDashboardChart({ type: DashboardChartType.Bar });

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardHeader
        title="Expenses Overview (Yearly)"
        slotProps={{ title: { variant: 'h6' } }}
      />
      <CardContent>
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
            },
          ]}
          grid={{ horizontal: true }}
          width={500}
          height={300}
          colors={['#37474f']}
        />
      </CardContent>
    </Card>
  );
};

export default DashboardBarChart;
