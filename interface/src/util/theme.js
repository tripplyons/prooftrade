import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffc0',
    },
    error: {
      main: '#ff0040',
    },
    background: {
      default: '#202224',
      paper: '#26282a',
    }
  },
});

export default theme;
