// themeService.js

const THEME_KEY = "theme";

// Get the current theme
export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || "light";
};

// Set a new theme
export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};

// Toggle between light and dark themes
export const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
  return newTheme;
};
