export type AuthContextData = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

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
