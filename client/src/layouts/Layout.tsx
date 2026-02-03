import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router';
import { AppRoutes } from '../routes/routes';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        component="aside"
        sx={{
          width: 240,
          borderRight: 1,
          borderColor: 'divider',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            component={Link}
            to={AppRoutes.Expenses}
            variant="outlined"
            fullWidth
          >
            Expenses
          </Button>
          <Button
            component={Link}
            to={AppRoutes.ExpenseCategories}
            variant="outlined"
            fullWidth
          >
            Categories
          </Button>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
