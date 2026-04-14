import React, { } from 'react';
import { Link, useNavigate } from 'react-router';
import { useErrors } from '../hooks/useErrors';
import { useMutation } from '@apollo/client/react';
import { MeDocument, UpdateUserDocument, type UpdateUserMutation, type UpdateUserMutationVariables } from '../graphql/__generated__/graphql';
import { Formik } from 'formik';
import type { EditUserFormValues } from '../types/types';
import { useAuth } from '../hooks/useAuth';
import { AppRoutes } from '../routes/routes';
import * as Yup from 'yup';
import { Button, Grid, Stack, Typography } from '@mui/material';
import UserFormProfile from '../components/UserFormProfile';
import { ArrowBack, Save } from '@mui/icons-material';

const EditUser: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { onError } = useErrors();

  const [updateUserMutation] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    { refetchQueries: [MeDocument], onError },
  );

  const validationSchema = Yup.object({
    name: Yup.string(),
    picture: Yup.mixed<File>(),
  });

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: '2rem' }}>
        Edit Profile
      </Typography>

      <Grid container spacing={2} justifyContent="center" direction="column">
        <Formik<EditUserFormValues>
          initialValues={{
            name: user?.name ?? undefined,
            picture: undefined,
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            updateUserMutation({
              variables: {
                user: {
                  id: user?.id ?? '',
                  name: values.name,
                  picture: values.picture,
                },
              },
            }).then(() => {
              navigate(AppRoutes.Expenses);
            });
          }}
        >
          {({ handleSubmit }) => (
            <form id="userForm" onSubmit={handleSubmit}>
              <div>
                <UserFormProfile user={user} />
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
            to={AppRoutes.Expenses}
          >
            Back
          </Button>
          <Button
            type="submit"
            form="userForm"
            variant="outlined"
            startIcon={<Save />}
          >
            Save
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default EditUser;