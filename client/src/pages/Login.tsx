import React, { useCallback } from 'react';
import UserForm from '../components/UserForm';
import { Button, Container, Grid, Typography } from '@mui/material';
import { AppRoutes } from '../routes/routes';
import { Link, useNavigate } from 'react-router';
import type { UserFormValues } from '../types/types';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback((values: UserFormValues) => {
    login(values.email, values.password, () => {
      navigate(AppRoutes.Expenses);
    });
  }, [login, navigate]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Login
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" direction="column">
          <UserForm
            onSubmit={onSubmit}
          />

          <div>
            <Button
              type="button"
              variant="outlined"
              style={{ marginRight: '1rem' }}
              component={Link}
              to={AppRoutes.CreateUser}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              form="userForm"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
