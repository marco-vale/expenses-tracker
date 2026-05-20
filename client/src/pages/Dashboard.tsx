import React from 'react';
import { Grid, Typography } from '@mui/material';
import DashboardPieChart from '../components/DashboardPieChart';
import DashboardBarChart from '../components/DashboardBarChart';

const Dashboard: React.FC = () => {
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        See an overview of your expenses.
      </Typography>

      <Grid container justifyContent="center" spacing={2} marginTop="2rem">
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardBarChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardPieChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
