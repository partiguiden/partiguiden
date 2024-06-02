import type { Theme } from "@react-navigation/native";
import colors from "tailwindcss/colors";

export const DarkTheme: Theme = {
  colors: {
    primary: colors.teal[500],
    background: colors.slate[900],
    card: colors.slate[800],
    text: colors.slate[100],
    border: colors.slate[700],
    notification: colors.red[500],
  },
  dark: true,
};

export const LightTheme: Theme = {
  colors: {
    primary: colors.teal[700],
    background: colors.white,
    card: colors.white,
    text: colors.slate[900],
    border: colors.slate[200],
    notification: colors.red[500],
  },
  dark: false,
};
