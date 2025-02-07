import { createContext, ReactNode, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeColors = {
  primary: string;
  text: string;
  background: string;
  card: string;
};

type ThemeContextType = {
    theme: Theme;
    colors: ThemeColors;
    toggleTheme: () => void;
  };
  
  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");

    // Define colors for light and dark themes
  const lightColors: ThemeColors = {
    primary: "#3B82F6", // Blue
    text: "#1F2937", // Gray-800
    background: "#F3F4F6", // Gray-100
    card: "#FFFFFF", // White
  };

  const darkColors: ThemeColors = {
    primary: "#60A5FA", // Light Blue
    text: "#F3F4F6", // Gray-100
    background: "#1F2937", // Gray-800
    card: "#374151", // Gray-700
  };

  // Get the current theme colors
  const colors = theme === "light" ? lightColors : darkColors;

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

  }