import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: File; output: File; }
};

export type DashboardChart = {
  __typename?: 'DashboardChart';
  dataPoints: Array<DashboardChartDataPoint>;
  labels?: Maybe<Array<Scalars['String']['output']>>;
};

export type DashboardChartDataPoint = {
  __typename?: 'DashboardChartDataPoint';
  label?: Maybe<Scalars['String']['output']>;
  values: Array<Scalars['Float']['output']>;
};

export type DashboardChartFilters = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  showCategories?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export enum DashboardChartType {
  Bar = 'BAR',
  Pie = 'PIE'
}

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category?: Maybe<ExpenseCategory>;
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: ExpenseType;
};

export type ExpenseCategoriesFilters = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ExpenseCategoriesReturn = {
  __typename?: 'ExpenseCategoriesReturn';
  count: Scalars['Int']['output'];
  expenseCategories: Array<ExpenseCategory>;
};

export type ExpenseCategory = {
  __typename?: 'ExpenseCategory';
  amount?: Maybe<Scalars['Float']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  deletable?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ExpenseCategoryCreateInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ExpenseCategoryUpdateInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ExpenseCreateInput = {
  amount: Scalars['Float']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: ExpenseType;
};

export enum ExpenseType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type ExpenseUpdateInput = {
  amount: Scalars['Float']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  type: ExpenseType;
};

export type ExpensesFilters = {
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<ExpenseType>>;
};

export type ExpensesImportInput = {
  file: Scalars['Upload']['input'];
  importCategories?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExpensesReturn = {
  __typename?: 'ExpensesReturn';
  count: Scalars['Int']['output'];
  expenses: Array<Expense>;
};

export type ExpensesSummary = {
  __typename?: 'ExpensesSummary';
  balance: Scalars['Float']['output'];
  categories: Array<ExpensesSummaryCategory>;
  expensesAmount: Scalars['Float']['output'];
  incomeAmount: Scalars['Float']['output'];
};

export type ExpensesSummaryCategory = {
  __typename?: 'ExpensesSummaryCategory';
  amount: Scalars['Float']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExpense: Scalars['ID']['output'];
  createExpenseCategory: Scalars['ID']['output'];
  createUser: Scalars['ID']['output'];
  deleteAll: Scalars['Int']['output'];
  deleteExpense: Scalars['ID']['output'];
  deleteExpenseCategory: Scalars['ID']['output'];
  importExpenses: Array<Scalars['ID']['output']>;
  login: Scalars['String']['output'];
  updateExpense: Scalars['ID']['output'];
  updateExpenseCategory: Scalars['ID']['output'];
  updateUser: Scalars['ID']['output'];
};


export type MutationCreateExpenseArgs = {
  expense: ExpenseCreateInput;
};


export type MutationCreateExpenseCategoryArgs = {
  expenseCategory: ExpenseCategoryCreateInput;
};


export type MutationCreateUserArgs = {
  user: UserCreateInput;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExpenseCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationImportExpensesArgs = {
  importData: ExpensesImportInput;
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationUpdateExpenseArgs = {
  expense: ExpenseUpdateInput;
};


export type MutationUpdateExpenseCategoryArgs = {
  expenseCategory: ExpenseCategoryUpdateInput;
};


export type MutationUpdateUserArgs = {
  user: UserUpdateInput;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  dashboardChart: DashboardChart;
  expense: Expense;
  expenseCategories: ExpenseCategoriesReturn;
  expenses: ExpensesReturn;
  expensesSummary: ExpensesSummary;
  me: User;
};


export type QueryDashboardChartArgs = {
  filters?: InputMaybe<DashboardChartFilters>;
  type: DashboardChartType;
};


export type QueryExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExpenseCategoriesArgs = {
  filters?: InputMaybe<ExpenseCategoriesFilters>;
  options?: InputMaybe<QueryOptions>;
};


export type QueryExpensesArgs = {
  filters?: InputMaybe<ExpensesFilters>;
  options?: InputMaybe<QueryOptions>;
};

export type QueryOptions = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rowsPerPage?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  startingBalance: Scalars['Float']['output'];
  startingBalanceEditable?: Maybe<Scalars['Boolean']['output']>;
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['Upload']['input']>;
  startingBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type UserUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['Upload']['input']>;
  startingBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateExpenseMutationVariables = Exact<{
  expense: ExpenseCreateInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: string };

export type CreateExpenseCategoryMutationVariables = Exact<{
  expenseCategory: ExpenseCategoryCreateInput;
}>;


export type CreateExpenseCategoryMutation = { __typename?: 'Mutation', createExpenseCategory: string };

export type CreateUserMutationVariables = Exact<{
  user: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };

export type DeleteAllMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllMutation = { __typename?: 'Mutation', deleteAll: number };

export type DeleteExpenseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense: string };

export type DeleteExpenseCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteExpenseCategoryMutation = { __typename?: 'Mutation', deleteExpenseCategory: string };

export type GetDashboardChartQueryVariables = Exact<{
  type: DashboardChartType;
  filters?: InputMaybe<DashboardChartFilters>;
}>;


export type GetDashboardChartQuery = { __typename?: 'Query', dashboardChart: { __typename?: 'DashboardChart', labels?: Array<string> | null, dataPoints: Array<{ __typename?: 'DashboardChartDataPoint', label?: string | null, values: Array<number> }> } };

export type GetExpenseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetExpenseQuery = { __typename?: 'Query', expense: { __typename?: 'Expense', id: string, description: string, type: ExpenseType, amount: number, date: string, category?: { __typename?: 'ExpenseCategory', id: string, name: string } | null } };

export type GetExpenseCategoriesQueryVariables = Exact<{
  filters?: InputMaybe<ExpenseCategoriesFilters>;
  options?: InputMaybe<QueryOptions>;
  getAmount?: Scalars['Boolean']['input'];
  getDeletable?: Scalars['Boolean']['input'];
}>;


export type GetExpenseCategoriesQuery = { __typename?: 'Query', expenseCategories: { __typename?: 'ExpenseCategoriesReturn', count: number, expenseCategories: Array<{ __typename?: 'ExpenseCategory', id: string, name: string, color?: string | null, amount?: number | null, deletable?: boolean | null }> } };

export type GetExpensesQueryVariables = Exact<{
  filters?: InputMaybe<ExpensesFilters>;
  options?: InputMaybe<QueryOptions>;
}>;


export type GetExpensesQuery = { __typename?: 'Query', expenses: { __typename?: 'ExpensesReturn', count: number, expenses: Array<{ __typename?: 'Expense', id: string, description: string, type: ExpenseType, amount: number, date: string, category?: { __typename?: 'ExpenseCategory', id: string, name: string } | null }> } };

export type GetExpensesSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpensesSummaryQuery = { __typename?: 'Query', expensesSummary: { __typename?: 'ExpensesSummary', expensesAmount: number, incomeAmount: number, balance: number, categories: Array<{ __typename?: 'ExpensesSummaryCategory', id?: string | null, name: string, amount: number }> } };

export type ImportExpensesMutationVariables = Exact<{
  importData: ExpensesImportInput;
}>;


export type ImportExpensesMutation = { __typename?: 'Mutation', importExpenses: Array<string> };

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, name?: string | null, picture?: string | null, startingBalance: number, startingBalanceEditable?: boolean | null } };

export type UpdateExpenseMutationVariables = Exact<{
  expense: ExpenseUpdateInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense: string };

export type UpdateExpenseCategoryMutationVariables = Exact<{
  expenseCategory: ExpenseCategoryUpdateInput;
}>;


export type UpdateExpenseCategoryMutation = { __typename?: 'Mutation', updateExpenseCategory: string };

export type UpdateUserMutationVariables = Exact<{
  user: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: string };


export const CreateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expense"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expense"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expense"}}}]}]}}]} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const CreateExpenseCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpenseCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseCategory"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseCategoryCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpenseCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseCategory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseCategory"}}}]}]}}]} as unknown as DocumentNode<CreateExpenseCategoryMutation, CreateExpenseCategoryMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAll"}}]}}]} as unknown as DocumentNode<DeleteAllMutation, DeleteAllMutationVariables>;
export const DeleteExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const DeleteExpenseCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpenseCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpenseCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>;
export const GetDashboardChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardChartType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardChartFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardChart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"labels"}},{"kind":"Field","name":{"kind":"Name","value":"dataPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardChartQuery, GetDashboardChartQueryVariables>;
export const GetExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetExpenseQuery, GetExpenseQueryVariables>;
export const GetExpenseCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenseCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseCategoriesFilters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryOptions"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"defaultValue":{"kind":"BooleanValue","value":true}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getDeletable"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"defaultValue":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"amount"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getAmount"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"deletable"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getDeletable"}}}]}]}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetExpenseCategoriesQuery, GetExpenseCategoriesQueryVariables>;
export const GetExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpensesFilters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetExpensesQuery, GetExpensesQueryVariables>;
export const GetExpensesSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpensesSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expensesSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expensesAmount"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetExpensesSummaryQuery, GetExpensesSummaryQueryVariables>;
export const ImportExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"importData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpensesImportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importExpenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"importData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"importData"}}}]}]}}]} as unknown as DocumentNode<ImportExpensesMutation, ImportExpensesMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"startingBalance"}},{"kind":"Field","name":{"kind":"Name","value":"startingBalanceEditable"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpdateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expense"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expense"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expense"}}}]}]}}]} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const UpdateExpenseCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpenseCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseCategory"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseCategoryUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpenseCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseCategory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseCategory"}}}]}]}}]} as unknown as DocumentNode<UpdateExpenseCategoryMutation, UpdateExpenseCategoryMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;