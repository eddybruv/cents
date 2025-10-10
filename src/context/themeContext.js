import { createContext } from "react";

// Central theme context object; used by ThemeProvider and the useThemeContext hook
export const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});
