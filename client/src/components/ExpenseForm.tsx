import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Link } from 'react-router';
import { type Expense, type ExpenseCategory } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';
import { AppRoutes } from '../routes/routes';

type ExpenseFormProps = {
  expense?: Expense;
  expenseCategories: ExpenseCategory[];
  onSubmit: (values: ExpenseFormValues) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, expenseCategories, onSubmit }) => {
  const validationSchema = Yup.object({
    id: Yup.string(),
    title: Yup.string().required(),
    amount: Yup.number().required().positive(),
    date: Yup.string().required(),
    categoryId: Yup.string(),
  });

  const formik = useFormik<ExpenseFormValues>({
    initialValues: {
      id: expense?.id || '',
      title: expense?.title || '',
      amount: expense?.amount ? expense.amount.toString() : '',
      date: expense?.date
        ? new Date(expense.date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      categoryId: expense?.category?.id || '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
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

        <Select
          id="categoryId"
          name="categoryId"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryId}
          style={{ marginTop: '1rem' }}
        >
          {expenseCategories.map((ec) => (
            <MenuItem
              key={ec.id}
              value={ec.id}
            >
              {ec.name}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Button
          type="button"
          variant="outlined"
          style={{ marginRight: '1rem' }}
          component={Link}
          to={AppRoutes.Home}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
        >
          {expense ? 'Save' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
