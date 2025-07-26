// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C0A0FF', // A lilac/purple color similar to your app
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
    }
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                borderRadius: '8px',
            }
        }
    }
  }
});

export default theme;