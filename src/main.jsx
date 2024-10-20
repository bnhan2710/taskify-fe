import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './themes'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme = {theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
)