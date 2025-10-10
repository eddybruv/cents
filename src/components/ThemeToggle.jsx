import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../hooks/useThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border transition-colors duration-200 bg-(--color-surface) border-(--color-border) text-(--color-fg) hover:border-(--color-accent) ${className}`}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
      <span className="text-sm hidden sm:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
};

export default ThemeToggle;
