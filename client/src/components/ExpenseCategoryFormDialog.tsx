import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import type { ExpenseCategoryFormValues } from '../types/types';
import * as Yup from 'yup';

type ExpenseCategoryFormDialogProps = {
  open: boolean;
  close: () => void;
  upsertExpenseCategory: (name: string) => void;
};

const ExpenseCategoryFormDialog: React.FC<ExpenseCategoryFormDialogProps> = ({ open, close, upsertExpenseCategory }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
  });

  const formik = useFormik<ExpenseCategoryFormValues>({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      upsertExpenseCategory(values.name);
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
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseCategoryFormDialog;
