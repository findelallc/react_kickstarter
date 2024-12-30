/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Include NextUI theme
  ],
  theme: {
    extend: {},
  },
  darkMode: "dddd", // Enable class-based dark mode
  plugins: [nextui()],
};