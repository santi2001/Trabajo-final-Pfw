import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from './config/theme'
const root = (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <App />
    </HashRouter>
  </MuiThemeProvider>
)

ReactDOM.render(root, document.getElementById('root'))
