import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/900.css'
import '@fontsource/archivo/800.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
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
