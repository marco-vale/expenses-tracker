import type React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import { AppRoutes } from './routes';
import { AuthRouteMode } from '../types/types';

type AuthRouteProps = {
  mode: AuthRouteMode;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ mode }) => {
  const { isAuthenticated } = useAuth();

  if (mode === AuthRouteMode.NoAuthCheck && !isAuthenticated) {
    return (
      <Navigate to={AppRoutes.Login} replace />
    );
  }

  if (mode === AuthRouteMode.AuthCheck && isAuthenticated) {
    return (
      <Navigate to={AppRoutes.Expenses} replace />
    );
  }

  return (
    <Outlet />
  );
};

export default AuthRoute;
