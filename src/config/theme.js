import { createMuiTheme } from '@material-ui/core'
const defaultTheme = createMuiTheme()
export const theme = createMuiTheme({
  palette: {
    // paleta de color
    primary: {
      // modificar color
      light: '#757ce8',
      main: '#00bcd4',
      dark: '#00acc1',
      contrastText: '#fff'
    },
    secondary: {
      // modificar color
      light: '#ff7961',
      main: '#ff9800',
      dark: '#f57c00',
      secondary: '#f44336'
    },
    success: {
      light: '#80e872',
      main: '#4bb543',
      dark: '#008410',
      contrastText: '#fff'
    }
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 0
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: 'none'
      },
      label: {
        fontWeight: 400
      }
    },
    MuiInputBase: {
      root: {
        '& fieldset': {
          borderRadius: 0
        }
      }
    },
    MuiFormControl: {
      root: {
        padding: 0
      }
    },
    MuiFilledInput: {
      root: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginBottom: defaultTheme.spacing(),
        backgroundColor: '#f0f0f0'
      },
      input: {
        padding: defaultTheme.spacing(2)
      },
      inputMarginDense: {
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2)
      },
      underline: {
        '&:after': {
          borderBottom: 'none'
        },
        '&:before': {
          borderBottom: 'none'
        },
        '&:hover:before': {
          borderBottom: 'none'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          // underline color when textfield is inactive
          borderBottom: '1px solid #5c35e0'
        },
        '&:hover:not($disabled):before': {
          // underline color when hovered
          borderBottom: '1px solid #0600ad'
        }
      }
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem'
    },
    h2: {
      fontSize: '2rem'
    },
    h3: {
      fontSize: '1.75rem'
    },
    h4: {
      fontSize: '1.5rem'
    },
    h5: {
      fontSize: '1.25rem'
    },
    h6: {
      fontSize: '1rem'
    }
  }
})

export default theme
