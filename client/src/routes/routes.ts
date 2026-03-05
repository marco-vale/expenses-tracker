export enum AppRoutes {
  Login = '/login',
  CreateUser = '/users/create',
  ExpenseCategories = '/expense-categories',
  Expenses = '/',
  CreateExpense = '/create',
  EditExpense = '/edit/:id',
  ImportExpenses='/import',
};

export const buildRoute = (route: AppRoutes, id: string): string => {
  return route.replace(':id', id);
};
