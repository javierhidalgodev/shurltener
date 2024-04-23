import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import '@fontsource/archivo/800.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Geist Sans'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Geist Sans'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dbff00'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#dbff00',
          },
          '&:autofill': {
            boxShadow: 'none'
          }
        }
      }
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={darkTheme} children>
      <CssBaseline />
      <Navbar />
      <SnackbarProvider maxSnack={3} style={{minWidth: 'fit-content'}}>
        <Main />
      </SnackbarProvider>
      <Footer />
    </ThemeProvider>
  )
}

export default App
