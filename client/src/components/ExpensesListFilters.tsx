import { Check, Clear, ExpandMore, FilterListAlt } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import React from "react";
import { ExpenseType, type ExpenseCategory, type ExpensesFilters } from '../graphql/__generated__/graphql';
import { useFormik } from 'formik';
import type { ExpensesListFiltersFormValues } from '../types/types';
import { formatDateString } from '../tools/formatDateString';
import * as Yup from 'yup';

type ExpensesListFiltersProps = {
  expenseCategories: ExpenseCategory[];
  expensesFilters?: ExpensesFilters;
  handleFiltersApply: (filters?: ExpensesFilters) => void;
  handleFiltersClear: () => void;
};

const ExpensesListFilters: React.FC<ExpensesListFiltersProps> = ({
  expenseCategories,
  expensesFilters,
  handleFiltersApply,
  handleFiltersClear,
}) => {
  const validationSchema = Yup.object({
    types: Yup.array().of(Yup.mixed<ExpenseType>().oneOf(Object.values(ExpenseType))),
    startDate: Yup.string(),
    endDate: Yup.string(),
    categories: Yup.array().of(Yup.string()),
  });

  const formik = useFormik<ExpensesListFiltersFormValues>({
    initialValues: {
      types: expensesFilters?.types ?? [],
      startDate: expensesFilters?.startDate
        ? formatDateString(expensesFilters.startDate)
        : '',
      endDate: expensesFilters?.endDate
        ? formatDateString(expensesFilters.endDate)
        : '',
      categories: expensesFilters?.categories ?? [],
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values => {
      handleFiltersApply({
        types: values.types,
        startDate: values.startDate ? values.startDate + 'T00:00:00.000Z' : '',
        endDate: values.endDate ? values.endDate + 'T23:59:59.999Z' : '',
        categories: values.categories,
      });
    }),
  });

  const onTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('types', event.target.value as unknown as ExpenseType[]);
  };

  const onCategoriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('categories', event.target.value as unknown as string[]);
  };

  const clearFilters = () => {
    formik.setFieldValue('types', []);
    formik.setFieldValue('startDate', '');
    formik.setFieldValue('endDate', '');
    formik.setFieldValue('categories', []);

    handleFiltersClear();
  };

  return (
    <Accordion sx={{ boxShadow: 'none', border: 1, borderColor: 'divider' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <FilterListAlt sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="subtitle1">Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
        >
          <TextField
            id="startDate"
            name="startDate"
            label="From"
            type="date"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startDate}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ flex: '1 1 120px', minWidth: 120 }}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate ? formik.errors.startDate : ''}
          />
          <TextField
            id="endDate"
            name="endDate"
            label="To"
            type="date"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endDate}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ flex: '1 1 120px', minWidth: 120 }}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : ''}
          />
          <TextField
            id="types"
            name="types"
            label="Types"
            select
            size="small"
            onChange={onTypesChange}
            onBlur={formik.handleBlur}
            value={formik.values.types}
            slotProps={{
              inputLabel: { shrink: true },
              select: { multiple: true },
            }}
            sx={{ flex: '1 1 120px', minWidth: 120 }}
            error={formik.touched.types && Boolean(formik.errors.types)}
            helperText={formik.touched.types && formik.errors.types ? formik.errors.types : ''}
          >
            <MenuItem value={ExpenseType.Expense}>
              <Checkbox checked={formik.values.types?.includes(ExpenseType.Expense)} size="small" />
              <ListItemText primary="Expense" />
            </MenuItem>
            <MenuItem value={ExpenseType.Income}>
              <Checkbox checked={formik.values.types?.includes(ExpenseType.Income)} size="small" />
              <ListItemText primary="Income" />
            </MenuItem>
          </TextField>
          <TextField
            id="categories"
            name="categories"
            label="Category"
            select
            size="small"
            onChange={onCategoriesChange}
            onBlur={formik.handleBlur}
            value={formik.values.categories}
            slotProps={{
              inputLabel: { shrink: true },
              select: { multiple: true },
            }}
            sx={{ flex: '1 1 120px', minWidth: 120 }}
            error={formik.touched.categories && Boolean(formik.errors.categories)}
            helperText={formik.touched.categories && formik.errors.categories ? formik.errors.categories : ''}
          >
            {expenseCategories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                <Checkbox checked={formik.values.categories?.includes(c.id)} size="small" />
                <ListItemText primary={c.name} />
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="outlined"
            startIcon={<Check />}
            sx={{
              whiteSpace: 'nowrap',
              width: 40,
              height: 40,
              minWidth: 'auto',
              padding: 0,
              justifyContent: 'center',
              '& .MuiButton-startIcon': { margin: 0 },
            }}
          />
          <Button
            variant="outlined"
            color="error"
            startIcon={<Clear />}
            sx={{
              whiteSpace: 'nowrap',
              width: 40,
              height: 40,
              minWidth: 'auto',
              padding: 0,
              justifyContent: 'center',
              '& .MuiButton-startIcon': { margin: 0 },
            }}
            onClick={clearFilters}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpensesListFilters;
