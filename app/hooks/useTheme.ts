"use client";

import { useEffect, useState, useCallback } from "react";
import {
  THEME_REGISTRY,
  DEFAULT_THEME,
  type ThemeName,
  getThemeDefinition,
} from "../lib/themes";

export function useTheme() {
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  const getInitialTheme = useCallback((): ThemeName => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const saved = localStorage.getItem("theme") as ThemeName | null;
    if (saved && getThemeDefinition(saved)) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  // Apply theme to DOM
  const applyTheme = useCallback((themeName: ThemeName) => {
    const themeDef = getThemeDefinition(themeName);
    if (!themeDef) return;

    const root = document.documentElement;
    // Remove all theme classes
    THEME_REGISTRY.forEach((t) => root.classList.remove(t.className));
    // Add new theme class
    root.classList.add(themeDef.className);
    root.setAttribute("data-theme", themeName);
    root.style.colorScheme = themeName === "dark" ? "dark" : "light";
  }, []);

  // Lazy initialization to avoid setState in effect
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    return getInitialTheme();
  });

  // Initialize on mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    if (initialTheme !== theme) {
      setThemeState(initialTheme);
    }
    applyTheme(initialTheme);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme when state changes
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted, applyTheme]);

  const setTheme = useCallback((themeName: ThemeName) => {
    if (getThemeDefinition(themeName)) {
      setThemeState(themeName);
    }
  }, []);

  return {
    theme,
    setTheme,
    availableThemes: THEME_REGISTRY,
    mounted,
  };
}
