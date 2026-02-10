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
import Layout from './layouts/Layout.tsx'
import CreateUser from './pages/CreateUser.tsx'
import Login from './pages/Login.tsx'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apollo}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path={AppRoutes.Login} element={<Login />} />
            <Route path={AppRoutes.CreateUser} element={<CreateUser />} />
            <Route element={<Layout />}>
              <Route path={AppRoutes.ExpenseCategories} element={<ExpenseCategories />} />
              <Route path={AppRoutes.Expenses} element={<Expenses />} />
              <Route path={AppRoutes.CreateExpense} element={<CreateExpense />} />
              <Route path={AppRoutes.EditExpense} element={<EditExpense />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)
