"use client";

import { createContext, useContext } from "react";
import { useTheme as useThemeHook } from "../hooks/useTheme";
import type { ThemeName } from "../lib/themes";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ReturnType<typeof useThemeHook>["availableThemes"];
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeData = useThemeHook();

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
