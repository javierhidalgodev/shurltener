import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import '@fontsource/archivo/800.css'
import { theme } from './assets/theme'

function App() {

  return (
    <ThemeProvider theme={theme}>
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
