export type ExpenseCategory = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category?: ExpenseCategory;
};
