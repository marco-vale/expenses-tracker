import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type React from 'react';
import { useCallback } from 'react';

type ExpenseDeleteDialogProps = {
  open: boolean;
  expenseToDeleteId: string;
  close: () => void;
  deleteExpense: (id: string) => void;
}

const ExpenseDeleteDialog: React.FC<ExpenseDeleteDialogProps> = ({ open, expenseToDeleteId, close, deleteExpense }) => {
  const handleDelete = useCallback(() => {
    deleteExpense(expenseToDeleteId);
    close();
  }, [deleteExpense, close, expenseToDeleteId]);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this expense?
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
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
