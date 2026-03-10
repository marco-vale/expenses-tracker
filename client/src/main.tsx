import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Expenses from './pages/Expenses.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'

import { ApolloProvider } from '@apollo/client/react'
import { apollo } from './apollo/client.ts'
import { AppRoutes } from './routes/routes.ts'
import CreateExpense from './pages/CreateExpense.tsx'
import EditExpense from './pages/EditExpense.tsx'
import ExpenseCategories from './pages/ExpenseCategories.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import CreateUser from './pages/CreateUser.tsx'
import Login from './pages/Login.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import AuthRoute from './routes/AuthRoute.tsx'
import { AuthRouteMode } from './types/types.ts'
import ImportExpenses from './pages/ImportExpenses.tsx'
import ErrorsProvider from './providers/ErrorsProvider.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import EditUser from './pages/EditUser.tsx'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apollo}>
      <ThemeProvider theme={theme}>
        <ErrorsProvider>
          <AuthProvider>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route element={<AuthRoute mode={AuthRouteMode.AuthCheck} />}>
                  <Route element={<AuthLayout />}>
                    <Route path={AppRoutes.Login} element={<Login />} />
                    <Route path={AppRoutes.CreateUser} element={<CreateUser />} />
                  </Route>
                </Route>

                <Route element={<AuthRoute mode={AuthRouteMode.NoAuthCheck} />}>
                  <Route element={<MainLayout />}>
                    <Route path={AppRoutes.EditUser} element={<EditUser />} />
                    <Route path={AppRoutes.ExpenseCategories} element={<ExpenseCategories />} />
                    <Route path={AppRoutes.Expenses} element={<Expenses />} />
                    <Route path={AppRoutes.CreateExpense} element={<CreateExpense />} />
                    <Route path={AppRoutes.EditExpense} element={<EditExpense />} />
                    <Route path={AppRoutes.ImportExpenses} element={<ImportExpenses />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ErrorsProvider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)
