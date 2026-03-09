import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatAmount } from '../tools/formatAmount';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';
import { ExpandMore } from '@mui/icons-material';

type ExpensesSummaryProps = {
  expenseCategories: ExpenseCategory[];
};

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ expenseCategories }) => {
  const totalAmount: number = expenseCategories.reduce((sum, ec) => sum + (ec.amount ?? 0), 0);

  return (
    <Stack spacing={2} marginTop="2rem">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1">Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem divider>
              <ListItemText primary="Total expenses" />
              <Typography variant="body2">{formatAmount(totalAmount)}</Typography>
            </ListItem>
            {expenseCategories.map((ec) => (
              <ListItem key={ec.id} divider>
                <ListItemText primary={ec.name} />
                <Typography variant="body2">{formatAmount(ec.amount ?? 0)}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ExpensesSummary;
