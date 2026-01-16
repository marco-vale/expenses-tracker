import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'

import CreateExpense from './CreateExpense.tsx'
import { ApolloProvider } from '@apollo/client/react'
import { apollo } from './apollo/client.ts'

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
            <Route path="/" element={<App />} />
            <Route path="/create" element={<CreateExpense />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)
