import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { AppRoutes } from '../routes/routes';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { CreateUserDocument, type CreateUserMutation, type CreateUserMutationVariables } from '../graphql/__generated__/graphql';
import type { UserFormValues } from '../types/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useErrors } from '../hooks/useErrors';

export const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { onError } = useErrors();

  const [createUserMutation] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    { onError },
  );

  const validationSchema = Yup.object({
    email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    name: Yup.string(),
    picture: Yup.mixed<File>(),
  });

  const formik = useFormik<UserFormValues>({
    initialValues: {
      email: '',
      password: '',
      name: undefined,
      picture: undefined,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      createUserMutation({
        variables: {
          user: {
            email: values.email,
            password: values.password,
            name: values.name,
            picture: values.picture,
          },
        },
      }).then(() => {
        navigate(AppRoutes.Login);
      });
    },
  });

  const onPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('picture', event.currentTarget.files?.[0]);
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Sign Up
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" direction="column">
          <form id="userForm" onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                id="email"
                name="email"
                label="E-mail"
                fullWidth
                autoFocus
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                slotProps={{ inputLabel: { shrink: true } }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                slotProps={{ inputLabel: { shrink: true } }}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextField
                id="name"
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                id="picture"
                name="picture"
                label="Picture"
                type="file"
                fullWidth
                margin="normal"
                onChange={onPictureChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: { accept: 'image/*' },
                }}
              />
            </div>
          </form>

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
