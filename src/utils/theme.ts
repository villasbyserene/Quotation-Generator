import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
    },
    typography: {
      // Default body font
      fontFamily: '"Montserrat", sans-serif',

      // Headings → Garamond
      h1: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 700,
      },
      h2: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 700,
      },
      h3: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 600,
      },
      h4: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 600,
        letterSpacing: "0.5px",
      },

      // Body text
      body1: {
        fontFamily: '"Montserrat", sans-serif',
        fontSize: "14px",
      },
      body2: {
        fontFamily: '"Montserrat", sans-serif',
        fontSize: "13px",
      },

      // Table headers / subtitles
      subtitle1: {
        fontFamily: '"EB Garamond", serif',
        fontWeight: 600,
      },
      subtitle2: {
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 500,
      },
    },
  };

  return createTheme(themeOptions);
};
