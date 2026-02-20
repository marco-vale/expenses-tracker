import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate, type Location } from 'react-router';
import { AppRoutes } from '../routes/routes';
import { Category, Euro, Logout } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Layout: React.FC = () => {
  const location: Location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(AppRoutes.Login);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        component="aside"
        sx={{
          width: 240,
          borderRight: 1,
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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

        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          <Logout sx={{ mr: 1 }} />
          Logout
        </Button>
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
