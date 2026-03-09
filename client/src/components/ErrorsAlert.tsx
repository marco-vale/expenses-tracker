import { Alert } from '@mui/material';
import React from 'react';
import { useErrors } from '../hooks/useErrors';

const ErrorsAlert: React.FC = () => {
  const { errors } = useErrors();

  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </Alert>
  );
};

export default ErrorsAlert;
