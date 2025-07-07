/** @format */

// start compoents
import Navbar from "./components/Navbar";
// End compoents

// start css files
import "./Css fills/style.css";
import "./App.css";
// End css files

//mui
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Routs from "./Routs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5c6bc0",
    },
    secondary: {
      main: "#f44336",
    },
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routs />
      </ThemeProvider>
    </>
  );
}

export default App;
