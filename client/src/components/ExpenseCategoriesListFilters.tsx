import { Check, Clear, ExpandMore, FilterListAlt, Search } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import type { ExpenseCategoriesFilters } from '../graphql/__generated__/graphql';
import type { ExpenseCategoriesListFiltersFormValues } from '../types/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type ExpenseCategoriesListFiltersProps = {
  expenseCategoriesFilters?: ExpenseCategoriesFilters;
  handleFiltersApply: (filters?: ExpenseCategoriesFilters) => void;
  handleFiltersClear: () => void;
}

const ExpenseCategoriesListFilters: React.FC<ExpenseCategoriesListFiltersProps> = ({
  expenseCategoriesFilters,
  handleFiltersApply,
  handleFiltersClear,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string(),
  });

  const formik = useFormik<ExpenseCategoriesListFiltersFormValues>({
    initialValues: {
      name: expenseCategoriesFilters?.name ?? '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleFiltersApply,
  });

  const clearFilters = () => {
    formik.setFieldValue('name', '');

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
            id="name"
            name="name"
            label="Name"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ flex: '1 1 120px', minWidth: 120 }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
          />

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

export default ExpenseCategoriesListFilters;
