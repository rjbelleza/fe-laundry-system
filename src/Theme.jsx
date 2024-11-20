import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D91656', // Set your primary color
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EE66A6', // Set your secondary color
      contrastText: '#ffffff',
    },
    success: {
      main: '#FFEB55',
      contrastText: '#ffffff',
    },
    info: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
