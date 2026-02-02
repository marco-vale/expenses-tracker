export enum AppRoutes {
  Home = '/',
  ExpenseCategories = '/expense-categories',
  CreateExpense = '/create',
  EditExpense = '/edit/:id',
};

export const buildRoute = (route: AppRoutes, id: string): string => {
  return route.replace(':id', id);
};
