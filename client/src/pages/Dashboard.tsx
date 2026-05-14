import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useQuery } from '@apollo/client/react';
import { GetDashboardDocument, type Dashboard, type DashboardChartElement, type GetDashboardQuery, type GetDashboardQueryVariables } from '../graphql/__generated__/graphql';
import { Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

const Dashboard: React.FC = () => {
  const { data } = useQuery<GetDashboardQuery, GetDashboardQueryVariables>(
    GetDashboardDocument,
    {
      fetchPolicy: 'network-only',
    },
  );

  const barChart: DashboardChartElement[] = data?.dashboard.barChart ?? [];
  const pieChart: DashboardChartElement[] = data?.dashboard.pieChart ?? [];

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        See an overview of your expenses.
      </Typography>

      <Grid container spacing={2} marginTop="2rem">
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: barChart.map(bc => bc.label),
              height: 28,
            },
          ]}
          series={[
            {
              data: barChart.map(bc => Math.abs(bc.value)),
            },
          ]}
          grid={{ horizontal: true }}
          height={300}
        >
          <ChartsReferenceLine
            y={0}
            lineStyle={{ strokeWidth: 1 }}
          />
        </BarChart>

        <PieChart
          series={[
            {
              data: pieChart.map((pc, index) => ({
                id: index,
                label: pc.label,
                value: Math.abs(pc.value),
              })),
            },
          ]}
          width={200}
          height={200}
        />
      </Grid>
    </>
  );
};

export default Dashboard;
