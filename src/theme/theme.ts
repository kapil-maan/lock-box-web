import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonComponents: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: '8px',
      }
    }
  }
};

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => {
  if (mode === 'dark') {
    return {
      palette: {
        mode: 'dark',
        primary: {
          main: '#C0A0FF',
        },
        background: {
          default: '#121212',
          paper: '#1E1E1E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B0B0B0',
        },
      },
      components: commonComponents,
    };
  }
  
  // else, return light mode palette
  return {
    palette: {
      mode: 'light',
      primary: {
        main: '#673ab7',
      },
      background: {
        default: '#f4f5f7',
        paper: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#555555',
      },
    },
    components: commonComponents,
  };
};

export const createAppTheme = (mode: 'light' | 'dark') => {
    return createTheme(getDesignTokens(mode));
}