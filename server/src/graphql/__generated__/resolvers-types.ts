import type { ExpenseType } from './generated/prisma/client';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GraphQLContext } from './src/graphql/context.ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: FileUpload; output: FileUpload; }
};

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
  type: ExpenseType;
};

export { ExpenseType };

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
  expense: Expense;
  expenseCategories?: Maybe<ExpenseCategoriesReturn>;
  expenses?: Maybe<ExpensesReturn>;
  expensesSummary: ExpensesSummary;
  me: User;
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


export type QueryExpensesSummaryArgs = {
  userToken: Scalars['String']['input'];
};


export type QueryMeArgs = {
  userToken: Scalars['String']['input'];
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
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['Upload']['input']>;
  startingBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type UserUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['Upload']['input']>;
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
  ExpenseCategoriesFilters: ExpenseCategoriesFilters;
  ExpenseCategoriesReturn: ResolverTypeWrapper<ExpenseCategoriesReturn>;
  ExpenseCategory: ResolverTypeWrapper<ExpenseCategory>;
  ExpenseCategoryCreateInput: ExpenseCategoryCreateInput;
  ExpenseCategoryUpdateInput: ExpenseCategoryUpdateInput;
  ExpenseCreateInput: ExpenseCreateInput;
  ExpenseType: ExpenseType;
  ExpenseUpdateInput: ExpenseUpdateInput;
  ExpensesFilters: ExpensesFilters;
  ExpensesImportInput: ExpensesImportInput;
  ExpensesReturn: ResolverTypeWrapper<ExpensesReturn>;
  ExpensesSummary: ResolverTypeWrapper<ExpensesSummary>;
  ExpensesSummaryCategory: ResolverTypeWrapper<ExpensesSummaryCategory>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  QueryOptions: QueryOptions;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Expense: Expense;
  ExpenseCategoriesFilters: ExpenseCategoriesFilters;
  ExpenseCategoriesReturn: ExpenseCategoriesReturn;
  ExpenseCategory: ExpenseCategory;
  ExpenseCategoryCreateInput: ExpenseCategoryCreateInput;
  ExpenseCategoryUpdateInput: ExpenseCategoryUpdateInput;
  ExpenseCreateInput: ExpenseCreateInput;
  ExpenseUpdateInput: ExpenseUpdateInput;
  ExpensesFilters: ExpensesFilters;
  ExpensesImportInput: ExpensesImportInput;
  ExpensesReturn: ExpensesReturn;
  ExpensesSummary: ExpensesSummary;
  ExpensesSummaryCategory: ExpensesSummaryCategory;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  QueryOptions: QueryOptions;
  String: Scalars['String']['output'];
  Upload: Scalars['Upload']['output'];
  User: User;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
};

export type ExpenseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Expense'] = ResolversParentTypes['Expense']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ExpenseCategory']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ExpenseType'], ParentType, ContextType>;
};

export type ExpenseCategoriesReturnResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ExpenseCategoriesReturn'] = ResolversParentTypes['ExpenseCategoriesReturn']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expenseCategories?: Resolver<Array<ResolversTypes['ExpenseCategory']>, ParentType, ContextType>;
};

export type ExpenseCategoryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ExpenseCategory'] = ResolversParentTypes['ExpenseCategory']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deletable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ExpenseTypeResolvers = EnumResolverSignature<{ EXPENSE?: any, INCOME?: any }, ResolversTypes['ExpenseType']>;

export type ExpensesReturnResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ExpensesReturn'] = ResolversParentTypes['ExpensesReturn']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
};

export type ExpensesSummaryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ExpensesSummary'] = ResolversParentTypes['ExpensesSummary']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['ExpensesSummaryCategory']>, ParentType, ContextType>;
  expensesAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  incomeAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type ExpensesSummaryCategoryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ExpensesSummaryCategory'] = ResolversParentTypes['ExpensesSummaryCategory']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createExpense?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, 'expense'>>;
  createExpenseCategory?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateExpenseCategoryArgs, 'expenseCategory'>>;
  createUser?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deleteAll?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deleteExpense?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteExpenseArgs, 'id'>>;
  deleteExpenseCategory?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteExpenseCategoryArgs, 'id'>>;
  importExpenses?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationImportExpensesArgs, 'importData'>>;
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'login'>>;
  updateExpense?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateExpenseArgs, 'expense'>>;
  updateExpenseCategory?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateExpenseCategoryArgs, 'expenseCategory'>>;
  updateUser?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  expense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<QueryExpenseArgs, 'id'>>;
  expenseCategories?: Resolver<Maybe<ResolversTypes['ExpenseCategoriesReturn']>, ParentType, ContextType, Partial<QueryExpenseCategoriesArgs>>;
  expenses?: Resolver<Maybe<ResolversTypes['ExpensesReturn']>, ParentType, ContextType, Partial<QueryExpensesArgs>>;
  expensesSummary?: Resolver<ResolversTypes['ExpensesSummary'], ParentType, ContextType, RequireFields<QueryExpensesSummaryArgs, 'userToken'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryMeArgs, 'userToken'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startingBalance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Expense?: ExpenseResolvers<ContextType>;
  ExpenseCategoriesReturn?: ExpenseCategoriesReturnResolvers<ContextType>;
  ExpenseCategory?: ExpenseCategoryResolvers<ContextType>;
  ExpenseType?: ExpenseTypeResolvers;
  ExpensesReturn?: ExpensesReturnResolvers<ContextType>;
  ExpensesSummary?: ExpensesSummaryResolvers<ContextType>;
  ExpensesSummaryCategory?: ExpensesSummaryCategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

