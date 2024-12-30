/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Include NextUI theme
  ],
  theme: {
    extend: {
      colors: {
        themePrimary: '#141229'
      },
    },
  },
  variants: {
    extend: {
      display: ['dark']
    },
  },
  darkMode: "class", // Enable class-based dark mode
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: "#010101",
          foreground: "#ffffff",
          primary: {
            DEFAULT: "#747AF4",
            foreground: "#ffffff",
          },
          danger: {
            DEFAULT: "#FC506D",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#4CD19F",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#78778B",
            foreground: "#ffffff",
          },
        }
      },
      light: {
        colors: {
          background: "#E4E3E8",
          foreground: "#000000",
          primary: {
            DEFAULT: "#000000",
            foreground: "#ffffff",
          },
          danger: {
            DEFAULT: "#FC506D",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#4CD19F",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#78778B",
            foreground: "#ffffff",
          },
        }
      }
    }
  })],
};