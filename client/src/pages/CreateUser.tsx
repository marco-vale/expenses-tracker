import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { AppRoutes } from '../routes/routes';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { CreateUserDocument, type CreateUserMutation, type CreateUserMutationVariables } from '../graphql/__generated__/graphql';
import type { CreateUserFormValues } from '../types/types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useErrors } from '../hooks/useErrors';
import UserFormProfile from '../components/UserFormProfile';
import { ArrowBack, PersonAdd } from '@mui/icons-material';
import { yupNumberPositiveOrZeroValidation, yupNumberValidation } from '../validations/validations';
import { parseNumberString } from '../tools/tools';

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
    startingBalance: yupNumberValidation.concat(yupNumberPositiveOrZeroValidation),
  });

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Sign Up
      </Typography>

      <Grid container spacing={2} justifyContent="center" direction="column">
        <Formik<CreateUserFormValues>
          initialValues={{
            email: '',
            password: '',
            name: undefined,
            picture: undefined,
            startingBalance: '',
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            createUserMutation({
              variables: {
                user: {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  picture: values.picture,
                  startingBalance: values.startingBalance ? parseNumberString(values.startingBalance) : 0,
                },
              },
            }).then(() => {
              navigate(AppRoutes.Login);
            });
          }}
        >
          {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
            <form id="userForm" onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="email"
                  name="email"
                  label="E-mail"
                  fullWidth
                  autoFocus
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <UserFormProfile />
              </div>
            </form>
          )}
        </Formik>

        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            startIcon={<ArrowBack fontSize="small" />}
            sx={{ textTransform: 'none' }}
            component={Link}
            to={AppRoutes.Login}
          >
            Back
          </Button>
          <Button
            type="submit"
            form="userForm"
            variant="outlined"
            startIcon={<PersonAdd />}
          >
            Sign Up
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default CreateUser;
