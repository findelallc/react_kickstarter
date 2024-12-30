/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Your source file paths
    './node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}', // Include NextUI components
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};