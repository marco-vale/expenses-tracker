import type { User } from '../graphql/__generated__/graphql';

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

export type LoginFormValues = {
  email: string;
  password: string;
};

export type UserFormValues = {
  email: string;
  password: string;
  name?: string;
  picture?: File;
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

export type ExpensesImportFormValues = {
  file: File | null;
  importCategories?: boolean;
};
