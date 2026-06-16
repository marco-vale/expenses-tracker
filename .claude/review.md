# Code Review — 2026-06-16

## Scope
Full codebase review. ~4,600 lines across 75 source files (all hand-written TS/TSX/GraphQL/Prisma).

## Findings

### 🔴 Critical

1. **`expensesSummary` leaks all categories across users**
   - **File**: `server/src/graphql/resolvers.ts` L218
   - **Issue**: `expenseCategories.findMany()` has no `where` clause — fetches all categories for all users.
   - **Why**: Another user's category names could appear in the summary.
   - **Fix**: Add `where: { userId: user.id }`.

2. **`process.env.JWT_SECRET!` no fallback if unset**
   - **File**: `server/src/graphql/resolvers.ts` L270, `server/src/helpers/getUserByToken.ts` L6
   - **Issue**: If `JWT_SECRET` is not set, auth is broken or insecure — no startup validation.
   - **Fix**: Validate `JWT_SECRET` exists at startup in `index.ts`, throw if missing.

3. **`AuthRoute` naming is inverted**
   - **File**: `client/src/routes/AuthRoute.tsx` L32-38
   - **Issue**: `NoAuthCheck` requires auth, `AuthCheck` is for guests. Names mean the opposite.
   - **Fix**: Rename to `RequiresAuth` / `GuestOnly`.

### 🟡 Warning

4. **`AuthProvider` calls `logout()` during render**
   - **File**: `client/src/providers/AuthProvider.tsx` L72-74
   - **Issue**: `if (meError) { logout(); }` triggers state update during render.
   - **Fix**: Move to `useEffect`.

5. **`getPrismaArgsFromQueryOptions` allows arbitrary `orderBy`**
   - **File**: `server/src/helpers/getPrismaArgsFromQueryOptions.ts` L3
   - **Issue**: No allowlist — user input passed directly to Prisma `orderBy`.
   - **Fix**: Validate against known sortable fields per entity.

6. **`handleException` strips error context**
   - **File**: `server/src/helpers/handleException.ts`
   - **Issue**: Wraps all errors with generic prefix, loses stack traces, exposes internals.
   - **Fix**: Log full error server-side, return sanitized messages to clients.

7. **`/uploads` served with no auth**
   - **File**: `server/src/index.ts` L74
   - **Issue**: Static files publicly accessible — includes user CSVs with financial data.
   - **Fix**: Add auth middleware or serve through a resolver that checks ownership.

8. **Uploaded CSV files never cleaned up**
   - **File**: `server/src/helpers/uploadFile.ts`, `server/uploads/`
   - **Issue**: 20+ files accumulating, never deleted after import.
   - **Fix**: Delete after successful import or add cleanup job.

9. **Raw `<input type="color">` with inline `style`**
   - **File**: `client/src/components/ExpenseCategoryFormDialog.tsx` L81-85
   - **Issue**: Violates MUI convention, won't respond to theme.
   - **Fix**: Wrap in `Box` with `sx` styling.

10. **`loaders` typed as `any` in context setup**
    - **File**: `server/src/index.ts` L60
    - **Issue**: `loaders: {} as any` bypasses type safety.
    - **Fix**: Restructure to avoid `any` cast.

### 🟢 Suggestion

11. Duplicate validation logic between client/server — consider shared package.
12. `getDashboardBarChart.ts` uses `any[]` for expenses parameter — add proper types.
13. `useExpenseCategories` prepends synthetic "Uncategorized" with `id: ''` — could cause type issues.
14. No 404/catch-all route in client routing.
15. Hardcoded `http://localhost:3001` in 3 client files — use `import.meta.env.VITE_API_URL`.
16. Delete mutations pass `id ?? ''` instead of early-returning on undefined.

## Resolved (from previous reviews)

- ~~**`ExpenseCategory.name` globally unique**~~ — Fixed 2026-06-16. Changed to `@@unique([name, userId])` compound unique. Migration `expensecategory_unique_name_per_user` applied. Also updated `importExpenses.ts` `connectOrCreate` to use compound key `name_userId`.

## TODOs
- [ ] Add explicit duplicate-name checks in `createExpenseCategory` and `updateExpenseCategory` resolvers for user-friendly error messages (currently relies on DB constraint → cryptic Prisma P2002 error)
