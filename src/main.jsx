import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'

//Cấu hình react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Cấu hình MUI confirm dialog
import { ConfirmProvider } from 'material-ui-confirm'


// Cấu hình redux store
import { store } from '~/redux/store'
import { Provider } from 'react-redux'

//Cấu hình react router dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'

// const inputGlobalStyles = <GlobalStyles styles={{ div:{ color: 'grey' } }} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
          allowClose: false,
          confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
          cancellationButtonProps: { variant: 'inherit' },
          dialogProps: { maxWidth: 'xs' },
          buttonOrder: ['confirm', 'cancel'],
        }}>
          <CssBaseline />
          {/* test GlobalStyles doc: https://mui.com/material-ui/customization/how-to-customize/*/}
          {/* <GlobalStyles styles={{ div:{ color: 'grey' } }} /> */}
          {/* {inputGlobalStyles} */}
          <App />
          <ToastContainer position = "top-right" theme = "colored" />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
