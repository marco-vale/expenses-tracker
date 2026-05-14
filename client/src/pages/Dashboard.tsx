import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useQuery } from '@apollo/client/react';
import { GetDashboardDocument, type Dashboard, type DashboardChartElement, type GetDashboardQuery, type GetDashboardQueryVariables } from '../graphql/__generated__/graphql';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

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

      <Grid container spacing={2} marginTop="2rem" justifyContent="center">
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
              width={500}
              height={300}
              colors={['#37474f']}
            />
          </CardContent>
        </Card>

        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardHeader
            title="Expenses Breakdown (Monthly)"
            slotProps={{ title: { variant: 'h6' } }}
          />
          <CardContent>
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
              width={250}
              height={250}
              colors={[
                '#37474f',
                '#546e7a',
                '#78909c',
                '#90a4ae',
                '#b0bec5',
                '#cfd8dc',
              ]}
            />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Dashboard;
