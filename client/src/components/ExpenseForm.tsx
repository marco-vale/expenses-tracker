import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { ExpenseType, type Expense, type ExpenseCategory } from '../graphql/__generated__/graphql';
import type { ExpenseFormValues } from '../types/types';

type ExpenseFormProps = {
  expense?: Expense;
  expenseCategories: ExpenseCategory[];
  onSubmit: (values: ExpenseFormValues) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, expenseCategories, onSubmit }) => {
  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    type: Yup.mixed<ExpenseType>().required('Type is required').oneOf(Object.values(ExpenseType)),
    amount: Yup.string()
      .required('Amount is required')
      .test('is-number', 'Amount must be a valid number', (value) => {
        return !isNaN(parseFloat(value));
      })
      .test('is-positive', 'Amount must be positive', (value) => {
        return parseFloat(value) > 0;
      }),
    date: Yup.string().required('Date is required'),
    categoryId: Yup.string(),
  });

  const formik = useFormik<ExpenseFormValues>({
    initialValues: {
      description: expense?.description ?? '',
      type: expense?.type ?? ExpenseType.Expense,
      amount: expense?.amount ? Math.abs(expense.amount).toString() : '',
      date: expense?.date
        ? new Date(expense.date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      categoryId: expense?.category?.id ?? '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <form id="expenseForm" onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          id="description"
          name="description"
          label="Description"
          fullWidth
          autoFocus
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          slotProps={{ inputLabel: { shrink: true } }}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description ? formik.errors.description : ''}
        />

        <TextField
          id="type"
          name="type"
          label="Type"
          select
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          slotProps={{ inputLabel: { shrink: true } }}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type ? formik.errors.type : ''}
        >
          <MenuItem value={ExpenseType.Expense}>Expense</MenuItem>
          <MenuItem value={ExpenseType.Income}>Income</MenuItem>
        </TextField>

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

        <TextField
          id="categoryId"
          name="categoryId"
          label="Category"
          select
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryId}
          slotProps={{ inputLabel: { shrink: true }, select: { displayEmpty: true }, }}
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
          helperText={formik.touched.categoryId && formik.errors.categoryId ? formik.errors.categoryId : ''}
        >
          {expenseCategories.map((ec) => (
            <MenuItem
              key={ec.id}
              value={ec.id}
            >
              {ec.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
};

export default ExpenseForm;
