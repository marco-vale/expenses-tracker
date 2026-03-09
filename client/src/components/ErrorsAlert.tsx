import { Alert } from '@mui/material';
import React from 'react';
import { useErrors } from '../hooks/useErrors';

const ErrorsAlert: React.FC = () => {
  const { errors, setErrors } = useErrors();

  const handleClose = () => {
    setErrors([]);
  };

  return (
    <>
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={handleClose}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}
    </>
  );
};

export default ErrorsAlert;
