"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Initialize theme from localStorage or system preference (runs once)
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  
  const stored = localStorage.getItem("friendroid-theme") as Theme | null;
  if (stored) return stored;
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    // Apply theme class to document immediately
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("friendroid-theme", theme);
      
      // Sync with document class
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    // Instant visual feedback - apply to DOM immediately before React state
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    // Then update React state
    setTheme(newTheme);
  };

  // Prevent flash by not rendering themed content until mounted
  if (!mounted) {
    return (
      <div className="theme-wrapper dark" data-theme="dark">
        <div className="opacity-0">{children}</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      <div className={`theme-wrapper ${theme === "dark" ? "dark" : ""}`} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Return default dark theme values during initial mount / SSR
  if (!context) {
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
      mounted: false,
    };
  }
  return context;
}
