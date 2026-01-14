import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { getTheme } from "./utils/theme";
import logo from "./assets/logo.png";
import ContentContainer from "./components/ContentContainer";
import "./App.css";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh">
        <AppBar
          position="sticky"
          elevation={2}
          sx={{
            backgroundColor: "#044231",
            width: "100vw",
            py: { xs: 0.5, md: 1 },
            px: { xs: 0, md: 0.5 },
          }}
        >
          <Toolbar className=" flex justify-between items-center">
            <div>
              <img src={logo} alt="logo" className="w-17 xl:w-20 h-auto" />
            </div>
            <div className="flex gap-4 items-center">
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Quotation Maker
              </Typography>

              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "light" ? <DarkMode /> : <LightMode />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <ContentContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
