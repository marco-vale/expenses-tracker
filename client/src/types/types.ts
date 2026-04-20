import type { ExpenseType, OrderDirection, User } from '../graphql/__generated__/graphql';
import type { useDialog } from '../hooks/useDialog';
import type { useTable } from '../hooks/useTable';

export enum AuthRouteMode {
  AuthCheck,
  NoAuthCheck,
};

export type AuthContextData = {
  userToken: string | null;
  user: User | null;
  userLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, onLogin?: () => void) => void;
  logout: (onLogout?: () => void) => void;
};

export type UseTableParams = {
  orderBy: string;
  orderDirection: OrderDirection;
  page?: number;
  rowsPerPage: number;
};

export type UseTableResult<T = unknown> = ReturnType<typeof useTable<T>>;

export type UseDialogResult<T = unknown> = ReturnType<typeof useDialog<T>>;

export type ErrorsContextData = {
  errors: string[];
  setErrors: (errors: string[]) => void;
};

export type ExpensesListFiltersFormValues = {
  types: ExpenseType[];
  startDate?: string;
  endDate?: string;
  categories: string[];
};

export type ExpenseCategoriesListFiltersFormValues = {
  name?: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type UserFormProfileValues = {
  name?: string;
  picture?: File;
  startingBalance?: string;
};

export type CreateUserFormValues = {
  email: string;
  password: string;
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
