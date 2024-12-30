import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Initialize theme from localStorage or default to "light"
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.add(savedTheme); // Add theme class to <html>
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    return (
        <button onClick={toggleTheme} className="theme-toggle-btn">
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
    );
};

export default ThemeToggle;
