export type ThemeName =
  | "light"
  | "dark"
  | "day"
  | "night"
  | "retro"
  | "neon"
  | "emoji";

export interface ThemeDefinition {
  name: ThemeName;
  label: string;
  className: string; // class added to <html>
  icon?: string; // optional emoji/icon in UI
}

export const THEME_REGISTRY: ThemeDefinition[] = [
  { name: "light", label: "Light", className: "theme-light", icon: "🌞" },
  { name: "dark", label: "Dark", className: "theme-dark", icon: "🌚" },
  { name: "day", label: "Day", className: "theme-day", icon: "🌤️" },
  { name: "night", label: "Night", className: "theme-night", icon: "🌙" },
  { name: "retro", label: "Retro", className: "theme-retro", icon: "🕹️" },
  { name: "neon", label: "Neon", className: "theme-neon", icon: "🌈" },
  { name: "emoji", label: "Emoji", className: "theme-emoji", icon: "🎨" },
];

export const DEFAULT_THEME: ThemeName = "dark";

export function getThemeDefinition(
  name: ThemeName
): ThemeDefinition | undefined {
  return THEME_REGISTRY.find((t) => t.name === name);
}
