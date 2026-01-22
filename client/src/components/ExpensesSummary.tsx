import { Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatAmount } from '../tools/formatAmount';
import type { ExpenseAmounts } from '../graphql/__generated__/graphql';

type ExpensesSummaryProps = {
  expenseAmounts: ExpenseAmounts | undefined;
};

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ expenseAmounts }) => {
  return (
    <Stack width="100%" direction="row" spacing={2} marginTop="1rem">
      <Card style={{ flexGrow: 1, padding: '1rem' }}>
        <Typography variant="h6" align="center">
          Total Expenses: {formatAmount(expenseAmounts?.amount || 0)}
        </Typography>
      </Card>
      {(expenseAmounts?.categories || []).map((eca) => (
        <Card key={eca.category.id} style={{ flexGrow: 1, padding: '1rem' }}>
          <Typography variant="h6" align="center">
            {eca.category.name}: {formatAmount(eca.amount)}
          </Typography>
        </Card>
      ))}
    </Stack>
  );
};

export default ExpensesSummary;
