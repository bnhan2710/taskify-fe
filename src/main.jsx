import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/themes'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme = {theme}>
      <ConfirmProvider>
        <CssBaseline />
        <App />
        <ToastContainer position='bottom-left' theme='colored' />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
