import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#00bfa5' },
    background: { default: '#f5f7fa', paper: '#ffffff' }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.125rem' },
    h2: { fontWeight: 700, fontSize: '1.75rem' },
    body1: { fontSize: '0.95rem' }
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
    MuiCard: { defaultProps: { elevation: 0 } }
  }
})

export default theme
