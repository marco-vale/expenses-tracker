import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import type { ExpenseCategoryFormValues, UseDialogResult } from '../types/types';
import * as Yup from 'yup';
import { Add, ArrowBack } from '@mui/icons-material';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';

type ExpenseCategoryFormDialogProps = {
  expenseCategoryFormDialog: UseDialogResult<ExpenseCategory>;
  onSubmit: (values: ExpenseCategoryFormValues) => void;
};

const ExpenseCategoryFormDialog: React.FC<ExpenseCategoryFormDialogProps> = ({ expenseCategoryFormDialog, onSubmit }) => {
  const { isOpen, data, close } = expenseCategoryFormDialog;

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    color: Yup.string().matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  });

  const formik = useFormik<ExpenseCategoryFormValues>({
    initialValues: {
      name: data?.name ?? '',
      color: data?.color ?? '#37474f',
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

  const onColorChange = (color: string) => {
    formik.setFieldValue('color', color);
  };

  const handleClose = useCallback(() => {
    close();
    formik.resetForm();
  }, [close, formik]);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
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
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <TextField
              id="color"
              name="color"
              label="Color"
              fullWidth
              margin="dense"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
              slotProps={{ inputLabel: { shrink: true } }}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color ? formik.errors.color : ''}
            />
            <input
              type="color"
              value={formik.values.color}
              onChange={(e) => onColorChange(e.target.value)}
              style={{ width: 48, height: 48, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="text"
            startIcon={<ArrowBack fontSize="small" />}
            sx={{ textTransform: 'none' }}
            onClick={handleClose}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="outlined"
            startIcon={<Add />}
          >
            {data?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseCategoryFormDialog;
