import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

const root = (
  <ThemeProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
)

ReactDOM.render(root, document.getElementById('root'))
