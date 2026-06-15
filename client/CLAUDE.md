# Client

React 19 + Vite 7 + Apollo Client 4 + MUI 7 frontend.

## Component Patterns

- **Functional components** with TypeScript — no class components
- **MUI** for all UI — Material-UI components, `@emotion/styled` for custom styling
- **Theme**: primary color `#37474f`, `borderRadius: 0` globally
- **Forms**: Formik for state, Yup for validation
  - Always set `validateOnChange: false` and `validateOnBlur: false`
  - Decimal input accepts comma or dot — use `parseNumberString()` from `tools/tools.ts` to normalize
  - Amount display uses `formatNumber()` → e.g., `"12.50€"`
- **Dialogs**: Use the `useDialog()` hook from `hooks/useDialog.ts` for open/close/data state
- **Tables**: Use the `useTable()` hook from `hooks/useTable.ts` for pagination and sorting
- **Errors**: Use the `useErrors()` hook — provides `onError` callback for Apollo operations

## GraphQL

- Operations defined as `.graphql` files in `src/graphql/`
- Run `npm run codegen` to regenerate `src/graphql/__generated__/graphql.ts`
- Use generated typed document nodes with Apollo's `useQuery`/`useMutation` hooks
- Apollo Client configured in `apollo/client.ts` with auth link (JWT), error link, and upload link
- Server must be running at `http://localhost:3001/graphql` for codegen to work

## Routing

- Routes defined in `routes/routes.ts` as `AppRoutes` enum
- Route guard via `AuthRoute` component with two modes:
  - `AuthRouteMode.AuthCheck` — requires auth, redirects to login if not authenticated
  - `AuthRouteMode.NoAuthCheck` — requires no auth, redirects to dashboard if authenticated
- Layouts: `AuthLayout` for login/signup, `MainLayout` for authenticated pages (sidebar nav + header)

## State Management

- **Apollo InMemoryCache** for server state
- **AuthContext**: `userToken`, `user`, `isAuthenticated`, `login()`, `logout()`, `userLoading`
- **ErrorsContext**: `errors[]`, `setErrors()`
- **AuthProvider**: Manages JWT token in localStorage (`user_token` key), fetches user via `MeQuery`
- No Redux or Zustand — Apollo cache + React contexts only

## Custom Hooks

| Hook | Purpose |
|------|---------|
| `useAuth()` | Access auth context (user, login, logout, isAuthenticated) |
| `useDialog()` | Generic dialog state (isOpen, data, open, close) |
| `useErrors()` | Access errors context + `onError` callback for Apollo |
| `useExpenseCategories()` | Fetch categories with filters |
| `useDashboardChart()` | Fetch dashboard chart data |
| `useTable()` | Pagination and sorting state for tables |

## Type Conventions

- Form value types defined in `types/types.ts` (e.g., `ExpenseFormValues`, `LoginFormValues`)
- Generated GraphQL types in `graphql/__generated__/graphql.ts` — never edit this file
- Amount in form values is `string` (user input), converted with `parseNumberString()` before submission

## File Organization

- One component per file
- Pages in `pages/`, reusable components in `components/`
- No barrel exports — import directly from file paths
