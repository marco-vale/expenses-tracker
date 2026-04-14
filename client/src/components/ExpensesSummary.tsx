import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatAmount } from '../tools/formatAmount';
import type { ExpensesSummary as ExpensesSummaryType } from '../graphql/__generated__/graphql';
import { ExpandMore } from '@mui/icons-material';

type ExpensesSummaryProps = {
  expensesSummary: ExpensesSummaryType | null;
};

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ expensesSummary }) => {
  if (!expensesSummary) {
    return null;
  }

  return (
    <Stack spacing={2} marginTop="2rem">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1">Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List disablePadding>
            <ListItem>
              <ListItemText>
                <Typography variant="body2" fontWeight="bold">Balance</Typography>
              </ListItemText>
              <Typography variant="body2" fontWeight="bold">{formatAmount(expensesSummary.balance)}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body2" fontWeight="bold" color="error">Total expenses</Typography>
              </ListItemText>
              <Typography variant="body2" fontWeight="bold" color="error">{formatAmount(Math.abs(expensesSummary.expensesAmount))}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body2" fontWeight="bold" color="success">Total income</Typography>
              </ListItemText>
              <Typography variant="body2" fontWeight="bold" color="success">{formatAmount(Math.abs(expensesSummary.incomeAmount))}</Typography>
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            {expensesSummary.categories.map((esc) => (
              <ListItem key={esc.id}>
                <ListItemText primary={esc.name} />
                <Typography variant="body2" fontWeight="bold" color={(esc.amount ?? 0) < 0 ? 'error' : 'success'}>{formatAmount(Math.abs(esc.amount))}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ExpensesSummary;
