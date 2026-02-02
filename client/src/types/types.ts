export type ExpenseFormValues = {
  id?: string;
  description: string;
  amount: string;
  date: string;
  categoryId?: string;
};

export type ExpenseCategoryFormValues = {
  name: string;
};
