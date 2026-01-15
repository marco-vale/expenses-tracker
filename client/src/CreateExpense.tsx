import { Container, Grid, Typography } from '@mui/material';
import ExpensesForm from './components/ExpensesForm';

function CreateExpense() {
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        New Expense
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <ExpensesForm />
        </Grid>
      </Container>
    </>
  );
}

export default CreateExpense;
