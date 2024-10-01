import type { Config } from "tailwindcss";

import { committeeColors } from "./lib/colors/committee";
import { partyColors } from "./lib/colors/party";

const themeHeight = {
  header: "3.5rem",
  "header-with-margin": "4.5rem",
  "header-sm": "6rem",
  "header-sm-with-margin": "7rem",
};

const themeWidth = {
  drawer: "18rem",
};

const config: Config = {
  darkMode: "class",
  content: [
    "./lib/styles/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  safelist: [
    {
      // Classes used for the document page
      pattern: /^parliament-.+$/,
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "10rem",
      },
    },
    extend: {
      colors: {
        party: {
          ...partyColors,
        },
        committee: {
          ...committeeColors,
        },
      },
      height: themeHeight,
      width: themeWidth,
      translate: {
        ...themeWidth,
      },
      spacing: {
        ...themeHeight,
      },
      minWidth: {
        screen: "100vw",
      },
      maxHeight: {
        "full-without-header": [
          `calc(100vh - ${themeHeight["header-sm-with-margin"]})`,
          `calc(100dvh - ${themeHeight["header-sm-with-margin"]})`,
        ] as unknown as string,
      },
      minHeight: {
        screen: [
          "100vh", // For browsers not supporting new viewport units
          "100dvh",
        ] as unknown as string,
      },
      aria: {
        "current-page": "current=page",
        "current-false": "current=false",
        visible: "hidden=false",
      },
    },
  },
};
export default config;
