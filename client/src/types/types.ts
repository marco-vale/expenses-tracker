import type { ExpenseType, User } from '../graphql/__generated__/graphql';

export enum AuthRouteMode {
  AuthCheck,
  NoAuthCheck,
};

export type AuthContextData = {
  userToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, onLogin?: () => void) => void;
  logout: (onLogout?: () => void) => void;
};

export type ErrorsContextData = {
  errors: string[];
  setErrors: (errors: string[]) => void;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type UserFormProfileValues = {
  name?: string;
  picture?: File;
};

export type CreateUserFormValues = {
  email: string;
  password: string;
  startingBalance?: string;
} & UserFormProfileValues;

export type EditUserFormValues = UserFormProfileValues;

export type ExpenseCategoryFormValues = {
  name: string;
};

export type ExpenseFormValues = {
  description: string;
  type: ExpenseType;
  amount: string;
  date: string;
  categoryId?: string;
};

export type ExpensesImportFormValues = {
  file: File | null;
  importCategories?: boolean;
};
