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
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category?: Maybe<ExpenseCategory>;
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ExpenseAmounts = {
  __typename?: 'ExpenseAmounts';
  amount: Scalars['Float']['output'];
  categories: Array<ExpenseCategoryAmount>;
};

export type ExpenseCategory = {
  __typename?: 'ExpenseCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ExpenseCategoryAmount = {
  __typename?: 'ExpenseCategoryAmount';
  amount: Scalars['Float']['output'];
  category: ExpenseCategory;
};

export type ExpenseCreateInput = {
  amount: Scalars['Float']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

export type ExpenseUpdateInput = {
  amount: Scalars['Float']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExpense: Scalars['ID']['output'];
  deleteExpense: Scalars['ID']['output'];
  updateExpense: Scalars['ID']['output'];
  upsertExpenseCategory: Scalars['ID']['output'];
};


export type MutationCreateExpenseArgs = {
  expense: ExpenseCreateInput;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateExpenseArgs = {
  expense: ExpenseUpdateInput;
};


export type MutationUpsertExpenseCategoryArgs = {
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  expense: Expense;
  expenseAmounts: ExpenseAmounts;
  expenseCategories: Array<ExpenseCategory>;
  expenses: Array<Expense>;
};


export type QueryExpenseArgs = {
  id: Scalars['ID']['input'];
};

export type CreateExpenseMutationVariables = Exact<{
  expense: ExpenseCreateInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: string };

export type DeleteExpenseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense: string };

export type GetExpenseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetExpenseQuery = { __typename?: 'Query', expense: { __typename?: 'Expense', id: string, description: string, amount: number, date: string, category?: { __typename?: 'ExpenseCategory', id: string, name: string } | null } };

export type GetExpenseAmountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpenseAmountsQuery = { __typename?: 'Query', expenseAmounts: { __typename?: 'ExpenseAmounts', amount: number, categories: Array<{ __typename?: 'ExpenseCategoryAmount', amount: number, category: { __typename?: 'ExpenseCategory', id: string, name: string } }> } };

export type GetExpenseCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpenseCategoriesQuery = { __typename?: 'Query', expenseCategories: Array<{ __typename?: 'ExpenseCategory', id: string, name: string }> };

export type GetExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', id: string, description: string, amount: number, date: string, category?: { __typename?: 'ExpenseCategory', id: string, name: string } | null }> };

export type UpdateExpenseMutationVariables = Exact<{
  expense: ExpenseUpdateInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense: string };

export type UpsertExpenseCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type UpsertExpenseCategoryMutation = { __typename?: 'Mutation', upsertExpenseCategory: string };


export const CreateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expense"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expense"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expense"}}}]}]}}]} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const DeleteExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const GetExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetExpenseQuery, GetExpenseQueryVariables>;
export const GetExpenseAmountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenseAmounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseAmounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetExpenseAmountsQuery, GetExpenseAmountsQueryVariables>;
export const GetExpenseCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenseCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetExpenseCategoriesQuery, GetExpenseCategoriesQueryVariables>;
export const GetExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetExpensesQuery, GetExpensesQueryVariables>;
export const UpdateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expense"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expense"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expense"}}}]}]}}]} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const UpsertExpenseCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertExpenseCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertExpenseCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<UpsertExpenseCategoryMutation, UpsertExpenseCategoryMutationVariables>;