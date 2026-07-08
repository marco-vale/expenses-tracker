import { Box, TextField } from '@mui/material';
import React from "react";
import type { User } from '../graphql/__generated__/graphql';
import { useFormikContext } from 'formik';
import type { UserFormProfileValues } from '../types/types';
import { useAuthenticatedImage } from '../hooks/useAuthenticatedImage';

type UserFormProfileProps = {
  user?: User | null;
};

const UserFormProfile: React.FC<UserFormProfileProps> = ({ user }) => {
  const formik = useFormikContext<UserFormProfileValues>();
  const serverPictureUrl = useAuthenticatedImage(user?.picture);

  const onPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('picture', event.currentTarget.files?.[0]);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
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
            label="Profile picture"
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
        </Box>

        {(formik.values.picture || user?.picture) && (
          <Box sx={{ mt: '1rem' }}>
            <Box
              component="img"
              src={
                formik.values.picture
                  ? URL.createObjectURL(formik.values.picture)
                  : serverPictureUrl
              }
              alt="Profile picture preview"
              sx={{
                width: 120,
                height: 120,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid #ddd',
              }}
            />
          </Box>
        )}
      </Box>

      <TextField
        id="startingBalance"
        name="startingBalance"
        label="Starting balance"
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.startingBalance}
        slotProps={{ inputLabel: { shrink: true } }}
        error={formik.touched.startingBalance && Boolean(formik.errors.startingBalance)}
        helperText={formik.touched.startingBalance && formik.errors.startingBalance}
        disabled={!(user?.startingBalanceEditable ?? false)}
      />
    </>
  );
};

export default UserFormProfile;