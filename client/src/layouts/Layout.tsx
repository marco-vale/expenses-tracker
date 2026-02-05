import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet, useLocation, type Location } from 'react-router';
import { AppRoutes } from '../routes/routes';
import { Category, Euro } from '@mui/icons-material';

const Layout: React.FC = () => {
  const location: Location = useLocation();

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
            variant={location.pathname === AppRoutes.Expenses ? 'contained' : 'outlined'}
            fullWidth
          >
            <Euro sx={{ mr: 1 }} />
            Expenses
          </Button>
          <Button
            component={Link}
            to={AppRoutes.ExpenseCategories}
            variant={location.pathname === AppRoutes.ExpenseCategories ? 'contained' : 'outlined'}
            fullWidth
          >
            <Category sx={{ mr: 1 }} />
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
