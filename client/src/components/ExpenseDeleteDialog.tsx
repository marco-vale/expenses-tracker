import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type React from 'react';
import { useCallback } from 'react';

type ExpenseDeleteDialogProps = {
  open: boolean;
  close: () => void;
  expenseToDeleteId: string;
  deleteExpense: (id: string) => void;
}

const ExpenseDeleteDialog: React.FC<ExpenseDeleteDialogProps> = ({ open, close, expenseToDeleteId, deleteExpense }) => {
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
