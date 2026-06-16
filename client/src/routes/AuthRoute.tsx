import type React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import { AppRoutes } from './routes';
import { AuthRouteMode } from '../types/types';
import { CircularProgress, Stack } from '@mui/material';

type AuthRouteProps = {
  mode: AuthRouteMode;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ mode }) => {
  const { userLoading, isAuthenticated } = useAuth();

  if (userLoading) {
    return (
      <Stack
        width="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Stack>
    );
  }

  if (mode === AuthRouteMode.Auth && !isAuthenticated) {
    return (
      <Navigate to={AppRoutes.Login} replace />
    );
  }

  if (mode === AuthRouteMode.Guest && isAuthenticated) {
    return (
      <Navigate to={AppRoutes.Dashboard} replace />
    );
  }

  return (
    <Outlet />
  );
};

export default AuthRoute;
