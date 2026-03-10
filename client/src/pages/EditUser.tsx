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
import { Button, Grid, Typography } from '@mui/material';
import UserFormProfile from '../components/UserFormProfile';

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
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
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
            Save
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default EditUser;