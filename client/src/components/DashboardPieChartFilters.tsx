import { Check, Clear, FilterList } from '@mui/icons-material';
import { Box, Button, Collapse, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import type { DashboardPieChartFiltersFormValues } from '../types/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type DashboardChartFilters } from '../graphql/__generated__/graphql';
import { formatDateString } from '../tools/formatDateString';

type DashboardPieChartFiltersProps = {
  dashboardChartFilters?: DashboardChartFilters;
  handleFiltersApply: (filters?: DashboardChartFilters) => void;
  handleFiltersClear: () => void;
};

const DashboardPieChartFilters: React.FC<DashboardPieChartFiltersProps> = ({
  dashboardChartFilters,
  handleFiltersApply,
  handleFiltersClear,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const validationSchema = Yup.object({
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const formik = useFormik<DashboardPieChartFiltersFormValues>({
    initialValues: {
      startDate: dashboardChartFilters?.startDate
        ? formatDateString(dashboardChartFilters.startDate)
        : '',
      endDate: dashboardChartFilters?.endDate
        ? formatDateString(dashboardChartFilters.endDate)
        : '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values => {
      handleFiltersApply({
        startDate: values.startDate ? values.startDate + 'T00:00:00.000Z' : '',
        endDate: values.endDate ? values.endDate + 'T23:59:59.999Z' : '',
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
      <Tooltip title={showFilters ? 'Hide filters' : 'Filter by date'} sx={{ marginLeft: 'auto' }}>
        <IconButton size="small" onClick={() => setShowFilters(!showFilters)}>
          <FilterList fontSize="small" />
        </IconButton>
      </Tooltip>
      <Collapse in={showFilters} sx={{ width: '100%' }}>
        <Box
          component="form"
          id="dashboardPieChartFiltersForm"
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

export default DashboardPieChartFilters;
