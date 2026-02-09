import React, { useCallback } from 'react';
import UserForm from '../components/UserForm';
import { Button, Container, Grid, Typography } from '@mui/material';
import { AppRoutes } from '../routes/routes';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { LoginUserDocument, type LoginUserMutation } from '../graphql/__generated__/graphql';
import type { UserFormValues } from '../types/types';

const LoginUser: React.FC = () => {
  const [loginUserMutation] = useMutation<LoginUserMutation>(LoginUserDocument);

  const navigate = useNavigate();

  const onSubmit = useCallback((values: UserFormValues) => {
    loginUserMutation({
      variables: {
        user: {
          email: values.email,
          password: values.password,
        },
      },
    }).then(() => {
      navigate(AppRoutes.Expenses);
    });
  }, [loginUserMutation, navigate]);

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

export default LoginUser;
