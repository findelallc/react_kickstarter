// ThemeProvider.js

import { useState, useEffect } from "react";
import { getTheme, setTheme, toggleTheme } from "./theme.service";
import { ThemeContext } from "./theme.context"; // Import the context
import PropTypes from 'prop-types';

const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getTheme());

  const updateTheme = (newTheme) => {
    setThemeState(newTheme);
    setTheme(newTheme); // Update the document and localStorage
  };

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setThemeState(newTheme);
  };

  useEffect(() => {
    setTheme(theme); // Ensure the theme is applied on mount
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validates that 'children' is passed
  };

export default ThemeProvider;
