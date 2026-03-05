import React from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { AppRoutes } from '../routes/routes';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useFormik } from 'formik';
import type { LoginFormValues } from '../types/types';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      login(values.email, values.password, () => {
        navigate(AppRoutes.Expenses);
      });
    },
  });

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Login
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
            </div>
          </form>

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
