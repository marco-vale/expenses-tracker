import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import type { ExpenseCategoryFormValues } from '../types/types';
import * as Yup from 'yup';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';

type ExpenseCategoryFormDialogProps = {
  open: boolean;
  close: () => void;
  expenseCategory?: ExpenseCategory;
  onSubmit: (values: ExpenseCategoryFormValues) => void;
};

const ExpenseCategoryFormDialog: React.FC<ExpenseCategoryFormDialogProps> = ({ open, close, expenseCategory, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  const formik = useFormik<ExpenseCategoryFormValues>({
    initialValues: {
      name: expenseCategory?.name ?? '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
      handleClose();
    },
  });

  const handleClose = useCallback(() => {
    close();
    formik.resetForm();
  }, [close, formik]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Category</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoFocus
            margin="dense"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            slotProps={{ inputLabel: { shrink: true } }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            {expenseCategory?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseCategoryFormDialog;
