import { ArrowBack, Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type React from 'react';
import { useCallback } from 'react';
import type { UseDialogResult } from '../types/types';

type ExpenseDeleteDialogProps = {
  expenseDeleteDialog: UseDialogResult<string>;
  deleteExpense: (id: string) => void;
}

const ExpenseDeleteDialog: React.FC<ExpenseDeleteDialogProps> = ({ expenseDeleteDialog, deleteExpense }) => {
  const { isOpen, data, close } = expenseDeleteDialog;

  const handleDelete = useCallback(() => {
    deleteExpense(data ?? '');
    close();
  }, [close, data, deleteExpense]);

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this expense?
      </DialogContent>
      <DialogActions>
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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDeleteDialog;
