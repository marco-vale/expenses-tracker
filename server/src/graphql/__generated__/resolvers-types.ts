import type { GraphQLResolveInfo } from 'graphql';
import type { GraphQLContext } from './src/graphql/context.ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type ExpenseCategory = {
  __typename?: 'ExpenseCategory';
  amount?: Maybe<Scalars['Float']['output']>;
  deletable?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ExpenseCategoryCreateInput = {
  name: Scalars['String']['input'];
};

export type ExpenseCategoryUpdateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
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
  createExpenseCategory: Scalars['ID']['output'];
  deleteExpense: Scalars['ID']['output'];
  deleteExpenseCategory: Scalars['ID']['output'];
  updateExpense: Scalars['ID']['output'];
  updateExpenseCategory: Scalars['ID']['output'];
};


export type MutationCreateExpenseArgs = {
  expense: ExpenseCreateInput;
};


export type MutationCreateExpenseCategoryArgs = {
  expenseCategory: ExpenseCategoryCreateInput;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExpenseCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateExpenseArgs = {
  expense: ExpenseUpdateInput;
};


export type MutationUpdateExpenseCategoryArgs = {
  expenseCategory: ExpenseCategoryUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  expense?: Maybe<Expense>;
  expenseCategories: Array<ExpenseCategory>;
  expenses: Array<Expense>;
};


export type QueryExpenseArgs = {
  id: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Expense: ResolverTypeWrapper<Expense>;
  ExpenseCategory: ResolverTypeWrapper<ExpenseCategory>;
  ExpenseCategoryCreateInput: ExpenseCategoryCreateInput;
  ExpenseCategoryUpdateInput: ExpenseCategoryUpdateInput;
  ExpenseCreateInput: ExpenseCreateInput;
  ExpenseUpdateInput: ExpenseUpdateInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Expense: Expense;
  ExpenseCategory: ExpenseCategory;
  ExpenseCategoryCreateInput: ExpenseCategoryCreateInput;
  ExpenseCategoryUpdateInput: ExpenseCategoryUpdateInput;
  ExpenseCreateInput: ExpenseCreateInput;
  ExpenseUpdateInput: ExpenseUpdateInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type ExpenseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Expense'] = ResolversParentTypes['Expense']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ExpenseCategory']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ExpenseCategoryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ExpenseCategory'] = ResolversParentTypes['ExpenseCategory']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deletable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createExpense?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, 'expense'>>;
  createExpenseCategory?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateExpenseCategoryArgs, 'expenseCategory'>>;
  deleteExpense?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteExpenseArgs, 'id'>>;
  deleteExpenseCategory?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteExpenseCategoryArgs, 'id'>>;
  updateExpense?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateExpenseArgs, 'expense'>>;
  updateExpenseCategory?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateExpenseCategoryArgs, 'expenseCategory'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  expense?: Resolver<Maybe<ResolversTypes['Expense']>, ParentType, ContextType, RequireFields<QueryExpenseArgs, 'id'>>;
  expenseCategories?: Resolver<Array<ResolversTypes['ExpenseCategory']>, ParentType, ContextType>;
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Expense?: ExpenseResolvers<ContextType>;
  ExpenseCategory?: ExpenseCategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

