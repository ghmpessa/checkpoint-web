import { createMuiTheme } from '@material-ui/core/styles'

export const Theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          padding: 0,
          margin: 0,
          boxSizing: 'border-box'
        }
      }
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,

    h1: {
      fontSize: '3rem',
      '@media screen and (max-width: 600px)': {
        fontSize: '1.8em'
      }
    }
  },

  palette: {
    primary: {
      main: '#61FF00'
    },
    text: {
      primary: '#f1f1f1'
    },
    background: {
      default: '#161616'
    }
  },
  spacing: 2
})
