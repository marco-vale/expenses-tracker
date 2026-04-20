import { ArrowBack, Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useCallback } from 'react';
import type { UseDialogResult } from '../types/types';

type DeleteDialogProps<T = unknown> = {
  deleteDialog: UseDialogResult<T>;
  deleteFunc: (id?: T) => void;
}

const DeleteDialog = <T = unknown>({ deleteDialog, deleteFunc }: DeleteDialogProps<T>) => {
  const { isOpen, data, close } = deleteDialog;

  const handleDelete = useCallback(() => {
    deleteFunc(data ?? undefined);
    close();
  }, [close, data, deleteFunc]);

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Are you sure? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBack fontSize="small" />}
          sx={{ textTransform: 'none' }}
          onClick={close}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          startIcon={<Delete />}
          color="error"
          onClick={handleDelete}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
