import { createTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[50],
    },
    secondary: {
      main: green[900],
    },
  },
  shape: {
    borderRadius: 0,
  },
});
