import type React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import { AppRoutes } from './routes';

const AuthRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate to={AppRoutes.Login} replace />
    );
  }

  return (
    <Outlet />
  );
};

export default AuthRoute;
