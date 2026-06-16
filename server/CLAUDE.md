# Server

Express 5 + Apollo Server 5 + Prisma 7 + SQLite backend.

## Architecture

- **Entry point**: `src/index.ts` — Express app with Apollo Server middleware
- **GraphQL endpoint**: `/graphql`
- **Health check**: `GET /health` → `{ ok: true }`
- **Static files**: `/uploads` serves uploaded files
- **File uploads**: `graphql-upload` middleware — 10MB limit, 1 file max

## Database (Prisma + SQLite)

Schema in `prisma/schema.prisma`. Three models:

- **User**: `id` (cuid), `email` (unique), `password` (argon2), `name?`, `picture?`, `startingBalance` (default 0), timestamps
- **ExpenseCategory**: `id` (cuid), `name` (unique per user), `userId`, relations to User and Expenses
- **Expense**: `id` (cuid), `description`, `type` (EXPENSE|INCOME enum), `amount` (signed float), `date`, `categoryId?`, `userId`, timestamps

### Prisma Workflow

Migration names must follow the format `<tablename>_<change>` where tablename is all lowercase (e.g., `expensecategory_add_color`, `expense_add_notes`).

```bash
# After editing schema.prisma:
npm run prisma:migrate    # Create and apply migration (use --name <tablename>_<change>)
npm run prisma:generate   # Regenerate Prisma client

# Visual database editor:
npm run prisma:studio
```

Prisma client instance is in `src/prisma/prisma.ts`. Uses Better SQLite3 adapter via `prisma.config.ts`.

## GraphQL

### Schema

- Defined in `src/graphql/typeDefs.ts` as a template literal string
- Run `npm run codegen` to regenerate `src/graphql/__generated__/resolvers-types.ts`
- Context type defined in `src/graphql/context.ts` — includes `prisma`, `user`, and `loaders`

### Resolver Patterns

All resolvers follow this pattern:

```typescript
// In src/graphql/resolvers.ts
someResolver: async (_, { data }, context) => {
  const user = checkAuth(context);           // Throws if not authenticated
  // ... validate input with Yup ...
  // ... business logic ...
  return result;
}
```

- **Authentication**: Call `checkAuth(context)` at the start — returns the authenticated User or throws
- **Error handling**: Errors propagate naturally via GraphQL error handling. Use `handleException()` wrapper for custom error messages
- **Mutations return IDs**: Create/update/delete mutations return the affected entity's `id` (string)
- **Validation**: Use Yup schemas from `validations/validations.ts` for input validation

### DataLoaders

Three DataLoaders in `src/graphql/loaders/` prevent N+1 queries:

| Loader | Returns | Used For |
|--------|---------|----------|
| `expenseCategoryAmountLoader` | `Float` | Sum of amounts in a category |
| `expenseCategoryDeletableLoader` | `Boolean` | Whether category has 0 expenses |
| `userStartingBalanceEditableLoader` | `Boolean` | Whether user has 0 expenses |

Loaders are instantiated per-request in `src/graphql/context.ts`.

## Helpers (`src/helpers/`)

| File | Purpose |
|------|---------|
| `checkAuth.ts` | Verify user is authenticated from context |
| `getUserByToken.ts` | Decode JWT and fetch user from DB |
| `handleException.ts` | Wrap errors with consistent message format |
| `uploadFile.ts` | Save uploaded file to `uploads/` with timestamp prefix |
| `importExpenses.ts` | Parse CSV/XLSX files and create expenses + categories |
| `getDashboardBarChart.ts` | Aggregate expenses by month for bar chart |
| `getDashboardPieChart.ts` | Aggregate expenses by category for pie chart |
| `getPrismaArgsFromQueryOptions.ts` | Convert pagination/sorting options to Prisma args |

## Authentication

- JWT tokens signed with secret, 4-hour expiry
- Token passed in `Authorization: Bearer {token}` header
- `getUserByToken()` in context setup decodes token and fetches user
- `checkAuth()` in resolvers throws `GraphQLError` if no user in context

## Validation

Yup schemas in `src/validations/validations.ts`:

- `yupNumberPositiveOrZeroValidation` — Number >= 0
- `yupDateValidation` — ISO 8601 date validation

## File Import

`importExpenses()` parses CSV/XLSX with these columns:

- `Data mov. ` (DD-MM-YYYY) — date
- `Descrição ` — description
- `Débito ` — debit amount (creates EXPENSE)
- `Crédito ` — credit amount (creates INCOME)
- `Categoria ` — category name (optionally auto-creates categories)

Uses `xlsx` library. Runs in a `prisma.$transaction()` for atomicity.

## Code Conventions

- No ESLint or Prettier configured on server side
- TypeScript strict mode enabled
- Date utilities in `src/tools/tools.ts`: `validateDateString()`, `parseDateString()`, `convertDateToString()`
- No barrel exports — import directly from file paths
