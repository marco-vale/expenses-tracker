import React from "react";
import { Box, Container } from '@mui/material';
import ErrorsAlert from '../components/ErrorsAlert';
import { Outlet } from 'react-router';

const AuthLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
          }}
        >
          <ErrorsAlert />

          <Container maxWidth="lg" sx={{ mt: '2rem' }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
