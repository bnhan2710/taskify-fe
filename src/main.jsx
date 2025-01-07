import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/themes'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './redux/store'


//config react-router-dom with BrowserRouter
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <CssVarsProvider theme = {theme}>
        <ConfirmProvider>
          <CssBaseline />
          <App />
          <ToastContainer position='bottom-left' theme='colored' />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
