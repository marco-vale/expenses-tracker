import React, { useCallback } from 'react';
import { Avatar, Box, Container, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { AppRoutes } from '../routes/routes';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import ErrorsAlert from '../components/ErrorsAlert';

const MainLayout: React.FC = () => {
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
          <Box
            sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', cursor: 'pointer' }}
            onClick={() => navigate(AppRoutes.EditUser)}
          >
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: 'grey.50',
          }}
        >
          <List disablePadding>
            <ListItemButton
              component={Link}
              to={AppRoutes.Expenses}
              selected={location.pathname === AppRoutes.Expenses}
            >
              <ListItemText primary="Expenses" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to={AppRoutes.ExpenseCategories}
              selected={location.pathname === AppRoutes.ExpenseCategories}
            >
              <ListItemText primary="Categories" />
            </ListItemButton>
          </List>

          <List disablePadding>
            <Divider />
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><Logout color="error" /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
            </ListItemButton>
          </List>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
          }}
        >
          <ErrorsAlert />

          <Container maxWidth="lg" sx={{ mt: '2rem' }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
