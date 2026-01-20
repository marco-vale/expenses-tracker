export type ExpenseFormValues = {
  id?: string;
  title: string;
  amount: string;
  date: string;
  categoryId?: string;
};

export type ExpenseCategoryFormValues = {
  name: string;
};
