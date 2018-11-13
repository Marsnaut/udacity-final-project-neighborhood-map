import React from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from "./Drawer";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Drawer />
    </MuiThemeProvider>
  )
}

export default App;