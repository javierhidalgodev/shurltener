import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#dbff00'
      }
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&:autofill': {
              boxShadow: '0 0 0 100px #121212 inset !important'
            }
          }
        }
      },
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