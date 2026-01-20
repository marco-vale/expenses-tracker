import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router';
import type { Expense } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';

type ExpenseFormProps = {
  expense?: Expense;
  onSubmit: (values: ExpenseFormValues) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit }) => {
  const validationSchema = Yup.object({
    id: Yup.string(),
    title: Yup.string().required(),
    amount: Yup.number().required().positive(),
    date: Yup.string().required(),
  });

  const formik = useFormik<ExpenseFormValues>({
    initialValues: {
      id: expense?.id || '',
      title: expense?.title || '',
      amount: expense?.amount ? expense.amount.toString() : '0',
      date: expense?.date
        ? new Date(expense.date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="title"
        name="title"
        label="Title"
        fullWidth
        autoFocus
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        slotProps={{ inputLabel: { shrink: true } }}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title ? formik.errors.title : ''}
      />

      <TextField
        id="amount"
        name="amount"
        label="Amount"
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.amount}
        slotProps={{ inputLabel: { shrink: true } }}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount ? formik.errors.amount : ''}
      />

      <TextField
        id="date"
        name="date"
        label="Date"
        type="datetime-local"
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
        slotProps={{ inputLabel: { shrink: true } }}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date ? formik.errors.date : ''}
      />

      <Button
        type="button"
        color="secondary"
        variant="outlined"
        style={{ marginTop: '1rem', marginRight: '1rem' }}
        component={Link}
        to={AppRoutes.Home}
      >
        Back
      </Button>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{ marginTop: '1rem' }}
      >
        {expense ? 'Save Expense' : 'Add Expense'}
      </Button>
    </form>
  );
};

export default ExpenseForm;
