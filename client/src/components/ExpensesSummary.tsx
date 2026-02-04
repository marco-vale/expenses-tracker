import { Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatAmount } from '../tools/formatAmount';
import type { ExpenseCategory } from '../graphql/__generated__/graphql';

type ExpensesSummaryProps = {
  expenseCategories: ExpenseCategory[];
};

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ expenseCategories }) => {
  const totalAmount: number = expenseCategories.reduce((sum, ec) => sum + (ec.amount ?? 0), 0);

  return (
    <Stack width="100%" direction="row" spacing={2} marginTop="2rem">
      <Card style={{ flexGrow: 1, padding: '1rem' }}>
        <Typography variant="h6" align="center">
          Total Expenses: {formatAmount(totalAmount)}
        </Typography>
      </Card>
      {expenseCategories.map((ec) => (
        <Card key={ec.id} style={{ flexGrow: 1, padding: '1rem' }}>
          <Typography variant="h6" align="center">
            {ec.name}: {formatAmount(ec.amount ?? 0)}
          </Typography>
        </Card>
      ))}
    </Stack>
  );
};

export default ExpensesSummary;
