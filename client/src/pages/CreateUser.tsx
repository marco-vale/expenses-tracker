import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import UserForm from '../components/UserForm';
import { AppRoutes } from '../routes/routes';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { CreateUserDocument, type CreateUserMutation } from '../graphql/__generated__/graphql';
import type { UserFormValues } from '../types/types';

export const CreateUser: React.FC = () => {
  const [createUserMutation] = useMutation<CreateUserMutation>(CreateUserDocument);

  const navigate = useNavigate();

  const onSubmit = useCallback((values: UserFormValues) => {
    createUserMutation({
      variables: {
        user: {
          email: values.email,
          password: values.password,
        },
      },
    }).then(() => {
      navigate(AppRoutes.Login);
    });
  }, [createUserMutation, navigate]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Sign Up
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
              to={AppRoutes.Login}
            >
              Back
            </Button>
            <Button
              type="submit"
              form="userForm"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default CreateUser;
