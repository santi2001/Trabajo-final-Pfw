import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from './config/theme'
import { Provider } from 'react-redux'
import store from './state/store'
const root = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
