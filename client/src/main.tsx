import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'

import { ApolloProvider } from '@apollo/client/react'
import { apollo } from './apollo/client.ts'
import { AppRoutes } from './routes/routes.ts'
import CreateExpense from './pages/CreateExpense.tsx'
import EditExpense from './pages/EditExpense.tsx'

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
            <Route path={AppRoutes.Home} element={<App />} />
            <Route path={AppRoutes.CreateExpense} element={<CreateExpense />} />
            <Route path={AppRoutes.EditExpense} element={<EditExpense />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)
