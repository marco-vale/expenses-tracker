import { useFormik } from 'formik';
import React from "react";
import type { UserFormValues } from '../types/types';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

type UserFormProps = {
  onSubmit: (values: UserFormValues) => void;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    email: Yup.string().required('E-mail is required').email('Invalid e-mail address'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik<UserFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
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
  );
};

export default UserForm;
