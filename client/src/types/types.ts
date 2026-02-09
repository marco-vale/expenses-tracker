export type UserFormValues = {
  email: string;
  password: string;
};

export type ExpenseCategoryFormValues = {
  name: string;
};

export type ExpenseFormValues = {
  description: string;
  amount: string;
  date: string;
  categoryId?: string;
};
