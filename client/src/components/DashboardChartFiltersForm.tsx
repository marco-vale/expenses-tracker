import { Check, Clear, FilterList } from '@mui/icons-material';
import { Box, Button, Collapse, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import type { DashboardChartFiltersFormValues } from '../types/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { DashboardChartFilters } from '../graphql/__generated__/graphql';
import { yupDateValidation } from '../validations/validations';
import { formatDateString } from '../tools/tools';

type DashboardChartFiltersFormProps = {
  dashboardChartFilters?: DashboardChartFilters;
  handleFiltersApply: (filters: DashboardChartFilters) => void;
  handleFiltersClear: () => void;
};

const DashboardChartFiltersForm: React.FC<DashboardChartFiltersFormProps> = ({
  dashboardChartFilters,
  handleFiltersApply,
  handleFiltersClear,
}) => {
  const [showFiltersForm, setShowFiltersForm] = useState<boolean>(false);

  const validationSchema = Yup.object({
    startDate: yupDateValidation,
    endDate: yupDateValidation,
  });

  const formik = useFormik<DashboardChartFiltersFormValues>({
    initialValues: {
      startDate: dashboardChartFilters?.startDate ? formatDateString(dashboardChartFilters.startDate) : '',
      endDate: dashboardChartFilters?.endDate ? formatDateString(dashboardChartFilters.endDate) : '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values => {
      handleFiltersApply({
        startDate: values.startDate ? values.startDate + 'T00:00:00.000Z' : undefined,
        endDate: values.endDate ? values.endDate + 'T23:59:59.999Z' : undefined,
      });
    }),
  });

  const clearFilters = () => {
    formik.setFieldValue('startDate', '');
    formik.setFieldValue('endDate', '');

    handleFiltersClear();
  };

  return (
    <>
      <Tooltip title={showFiltersForm ? 'Hide filters' : 'Filter by date'} sx={{ marginLeft: 'auto' }}>
        <IconButton size="small" onClick={() => setShowFiltersForm(!showFiltersForm)}>
          <FilterList fontSize="small" />
        </IconButton>
      </Tooltip>
      <Collapse in={showFiltersForm} sx={{ width: '100%' }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, px: 2, pt: 1, pb: 2 }}
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
      </Collapse>
    </>
  );
};

export default DashboardChartFiltersForm;
