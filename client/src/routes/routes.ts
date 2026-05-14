export enum AppRoutes {
  Login = '/login',
  CreateUser = '/users/create',
  EditUser = '/users/edit',
  Dashboard = '/',
  ExpenseCategories = '/expense-categories',
  Expenses = '/expenses',
  CreateExpense = '/expenses/create',
  EditExpense = '/expenses/edit/:id',
  ImportExpenses='/expenses/import',
};

export const buildRoute = (route: AppRoutes, id: string): string => {
  return route.replace(':id', id);
};
