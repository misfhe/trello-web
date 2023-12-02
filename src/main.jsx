import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import { GlobalStyles } from '@mui/material'

const inputGlobalStyles = <GlobalStyles styles={{ div:{ color: 'grey' } }} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {/* test GlobalStyles doc: https://mui.com/material-ui/customization/how-to-customize/*/}
      {/* <GlobalStyles styles={{ div:{ color: 'grey' } }} /> */}
      {inputGlobalStyles}
      <App />
    </CssVarsProvider>
  </>
)
