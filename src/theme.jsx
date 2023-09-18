import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Teal
    },
    secondary: {
      main: '#E0E0E0', // Light Gray
    },
    background: {
      default: '#F5F5F5', // Soft Gray
    },
    text: {
      primary: '#333333', // Almost Black
      secondary: '#555555', // Dark Gray
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // If you prefer non-uppercase buttons
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export default theme;
