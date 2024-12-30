import { useState, useEffect } from "react";
import { getTheme, toggleTheme } from "../services/theme.service";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getTheme());

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme); // Update the local state
  };

  useEffect(() => {
    // Ensure the theme is applied when the component mounts
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <button onClick={handleToggle} className="theme-toggle-btn">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;