import { extendTheme } from "@nextui-org/react";

export const lightTheme = extendTheme({
  type: "light",
  theme: {
    colors: {
      background: "#ffffff",
      primary: "#1E90FF",
    },
  },
});

export const darkTheme = extendTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#121212",
      primary: "#FF6347",
    },
  },
});
