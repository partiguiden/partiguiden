import { Roboto } from "next/font/google";
import type { Theme } from "@mui/material/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const getTheme = (darkMode: boolean): Theme =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: {
          main: "#00796b",
        },
        secondary: {
          main: "#80cbc4",
        },
        background: {
          paper: darkMode ? "#242526" : "#ffffff",
          default: darkMode ? "#18191A" : "#fafafa",
        },
      },
      typography: {
        button: {
          textDecoration: "none",
        },
        h1: {
          fontSize: "2.25rem",
        },
        h2: {
          fontSize: "2rem",
        },
        h3: {
          fontSize: "1.75rem",
        },
        h4: {
          fontSize: "1.75rem",
          fontWeight: "lighter",
        },
        h5: {
          fontSize: "1.5rem",
        },
        h6: {
          fontSize: "1.25rem",
        },
        fontFamily: roboto.style.fontFamily,
      },
      components: {
        MuiButtonBase: {
          styleOverrides: {
            root: {
              fontSize: "1rem",
              fontFamily: "inherit",
              WebkitTransition: "background-color 0.4s ease-in-out",
              MozTransition: "background-color 0.4s ease-in-out",
              msTransition: "background-color 0.4s ease-in-out",
              transition: "background-color 0.4s ease-in-out",
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            textColorInherit: {
              opacity: 0.9,
            },
          },
        },
      },
    }),
  );

export default getTheme;