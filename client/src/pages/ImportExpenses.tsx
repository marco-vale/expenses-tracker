import { Button, Container, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import React from "react";
import { Link, useNavigate } from 'react-router';
import { AppRoutes } from '../routes/routes';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { ExpensesImportFormValues } from '../types/types';
import { ImportExpensesDocument, type ImportExpensesMutation, type ImportExpensesMutationVariables } from '../graphql/__generated__/graphql';
import { useMutation } from '@apollo/client/react';
import { useErrors } from '../hooks/useErrors';

const ImportExpenses: React.FC = () => {
  const navigate = useNavigate();
  const { onError } = useErrors();

  const [importExpensesMutation] = useMutation<ImportExpensesMutation, ImportExpensesMutationVariables>(
    ImportExpensesDocument,
    { onError },
  );

  const validationSchema = Yup.object({
    file: Yup.mixed<File>().required('File is required'),
  });

  const formik = useFormik<ExpensesImportFormValues>({
    initialValues: {
      file: null,
      importCategories: true,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (!values.file) {
        return;
      }

      importExpensesMutation({
        variables: {
          importData: {
            file: values.file,
            importCategories: values.importCategories,
          },
        },
      }).then(() => {
        navigate(AppRoutes.Expenses);
      });
    },
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('file', event.currentTarget.files?.[0]);
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Import Expenses
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" direction="column">
          <form id="expensesImportForm" onSubmit={formik.handleSubmit}>
            <TextField
              id="file"
              name="file"
              label="File"
              type="file"
              fullWidth
              margin="normal"
              onChange={onFileChange}
              onBlur={formik.handleBlur}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { accept: 'text/csv' },
              }}
              error={formik.touched.file && Boolean(formik.errors.file)}
              helperText={formik.touched.file && formik.errors.file}
            />

            <FormControlLabel
              control={
                <Switch
                  name="importCategories"
                  checked={formik.values.importCategories}
                  onChange={formik.handleChange}
                />
              }
              label="Import Categories"
            />
          </form>

          <div>
            <Button
              type="button"
              variant="outlined"
              style={{ marginRight: '1rem' }}
              component={Link}
              to={AppRoutes.Expenses}
            >
              Back
            </Button>
            <Button
              type="submit"
              form="expensesImportForm"
              variant="contained"
            >
              Import
            </Button>
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default ImportExpenses;