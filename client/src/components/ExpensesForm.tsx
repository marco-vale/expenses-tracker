import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { createExpense } from '../graphql/createExpense';
import type { CreateExpenseMutation } from '../graphql/__generated__/graphql';

type ExpenseFormValues = {
  title: string;
  amount: string;
  date: string;
};

const ExpensesForm: React.FC = () => {
  const [createExpenseMutation] = useMutation<CreateExpenseMutation>(createExpense);

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    amount: Yup.number().required().positive(),
    date: Yup.string().required(),
  });

  const formik = useFormik<ExpenseFormValues>({
    initialValues: {
      title: '',
      amount: '0',
      date: new Date().toISOString().slice(0, 16),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);

      createExpenseMutation({
        variables: {
          expense: {
            title: values.title,
            amount: Number(values.amount),
            date: new Date(values.date).toISOString(),
          },
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="title"
        name="title"
        label="Title"
        fullWidth
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
        to="/"
      >
        Back
      </Button>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{ marginTop: '1rem' }}
      >
        Create Expense
      </Button>
    </form>
  );
};

export default ExpensesForm;
