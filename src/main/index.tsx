import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/main/routes/router'
import { Theme } from '@/presentation/styles/theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <Router />
  </ThemeProvider>,
  document.getElementById('main')
)
