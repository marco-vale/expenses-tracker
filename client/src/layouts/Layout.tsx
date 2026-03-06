import React, { useCallback } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { AppRoutes } from '../routes/routes';
import { Category, Euro, Logout } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    logout(() => {
      navigate(AppRoutes.Login);
    });
  }, [logout, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        component="header"
        sx={{
          height: 56,
          flexShrink: 0,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">
          Expenses Tracker
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Typography variant="subtitle1">
              {`Welcome, ${user.name ?? user.email}!`}
            </Typography>
            <Avatar
              src={user.picture ? `http://localhost:3001${user.picture}` : undefined}
              alt={user.name ?? user.email}
              sx={{ width: 32, height: 32, ml: 1 }}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
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
    </Box>
  );
};

export default Layout;
