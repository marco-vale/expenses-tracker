# Expenses Tracker

Personal finance tracking app — monorepo with a React client and a Node.js/Express GraphQL server backed by SQLite.

## Tech Stack

- **Client**: React 19, Vite 7, Apollo Client 4, MUI 7, Formik, Yup, TypeScript 5.9
- **Server**: Express 5, Apollo Server 5, Prisma 7 (SQLite via Better SQLite3 adapter), GraphQL, TypeScript 5.9
- **Auth**: JWT (4h expiry) + argon2 password hashing
- **Codegen**: GraphQL Code Generator for both client (typed-document-node) and server (typescript-resolvers)

## Development

```bash
# Start both client and server in parallel
./dev.sh

# Or individually
cd client && npm run dev   # Vite dev server on :5173
cd server && npm run dev   # tsx watch on :3001
```

## Commands

### Client (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run codegen` | Generate GraphQL types from `.graphql` files |

### Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with auto-reload (tsx watch) |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled server |
| `npm run codegen` | Generate resolver types from schema |
| `npm run prisma:migrate` | Run Prisma migrations |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:studio` | Open visual database editor |

## Project Structure

```
├── client/                  # React frontend
│   └── src/
│       ├── apollo/          # Apollo Client setup
│       ├── components/      # React components
│       ├── constants/       # Constants (localStorage keys)
│       ├── contexts/        # React contexts (Auth, Errors)
│       ├── graphql/         # .graphql operations + __generated__/ types
│       ├── hooks/           # Custom hooks
│       ├── layouts/         # Page layouts (Auth, Main)
│       ├── pages/           # Page components
│       ├── providers/       # Context providers
│       ├── routes/          # Routing (AppRoutes enum, AuthRoute guard)
│       ├── tools/           # Utility functions
│       ├── types/           # TypeScript types
│       └── validations/     # Yup validation schemas
├── server/                  # Node.js backend
│   ├── prisma/              # Schema + migrations
│   ├── uploads/             # Uploaded CSV files
│   └── src/
│       ├── graphql/         # typeDefs, resolvers, context, loaders/, __generated__/
│       ├── helpers/         # Business logic (auth, charts, import, upload)
│       ├── prisma/          # Prisma client instance
│       ├── tools/           # Date utilities
│       ├── types/           # TypeScript types
│       └── validations/     # Yup validation schemas
├── apollo.config.js         # Apollo tooling config
└── dev.sh                   # Starts both client and server
```

## GraphQL Codegen Workflow

When modifying the GraphQL API:

1. Edit the schema in `server/src/graphql/typeDefs.ts`
2. Run `npm run codegen` in `server/` → generates `src/graphql/__generated__/resolvers-types.ts`
3. Implement resolvers in `server/src/graphql/resolvers.ts`
4. Add/edit `.graphql` operation files in `client/src/graphql/`
5. Run `npm run codegen` in `client/` → generates `src/graphql/__generated__/graphql.ts`
6. Use generated typed document nodes in client components

**Important**: The server must be running for client codegen to work (it introspects the schema from `http://localhost:3001/graphql`).

## Key Conventions

- **Amounts**: Stored as signed floats — EXPENSE is negative, INCOME is positive. Displayed as absolute value with "€" suffix (e.g., "12.50€").
- **Dates**: ISO 8601 format throughout. Client uses `dayjs` for formatting.
- **Auth**: JWT token stored in localStorage under `user_token`. All protected resolvers call `checkAuth(context)`.
- **Error handling**: Server wraps all errors with `handleException()`. Client displays errors via `ErrorsContext`.
- **Mutations return IDs**: All create/update/delete mutations return the affected entity's ID (string).
- **No barrel exports**: Files are imported directly, no `index.ts` barrel files.
- **Decimal input**: Users can type commas or dots as decimal separator. `parseNumberString()` normalizes them.
- **Migration naming**: Prisma migrations must be named `<tablename>_<change>` with the table name in all lowercase (e.g., `expensecategory_add_color`).

## Database Models

- **User**: email (unique), password (argon2), name, picture, startingBalance
- **ExpenseCategory**: name (unique per user), belongs to User, has many Expenses
- **Expense**: description, type (EXPENSE|INCOME), amount (signed float), date, optional category, belongs to User

## Security

- JWT tokens expire after 4 hours
- Passwords hashed with argon2
- CORS restricted to `http://localhost:5173`
- All data scoped to authenticated user (userId on all models)
- File uploads limited to 10MB, 1 file per request
