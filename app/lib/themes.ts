export type ThemeName =
  | "light"
  | "dark"
  | "cowprint"
  | "watercolor"
  | "floral"
  | "sunset"
  | "vintage"
  | "geometric"
  | "christmas";

export interface ThemeDefinition {
  name: ThemeName;
  label: string;
  className: string; // class added to <html>
  icon?: string; // optional emoji/icon in UI
}

export const THEME_REGISTRY: ThemeDefinition[] = [
  { name: "light", label: "Light", className: "theme-light", icon: "🌞" },
  { name: "dark", label: "Dark", className: "theme-dark", icon: "🌚" },
  {
    name: "cowprint",
    label: "Cow Print",
    className: "theme-cowprint",
    icon: "🐄",
  },
  {
    name: "watercolor",
    label: "Watercolor",
    className: "theme-watercolor",
    icon: "🎨",
  },
  { name: "floral", label: "Floral", className: "theme-floral", icon: "🌸" },
  { name: "sunset", label: "Sunset", className: "theme-sunset", icon: "🌅" },
  { name: "vintage", label: "Vintage", className: "theme-vintage", icon: "📜" },
  {
    name: "geometric",
    label: "Geometric",
    className: "theme-geometric",
    icon: "🔷",
  },
  {
    name: "christmas",
    label: "Christmas",
    className: "theme-christmas",
    icon: "🎄",
  },
];

export const DEFAULT_THEME: ThemeName = "watercolor";

export function getThemeDefinition(
  name: ThemeName
): ThemeDefinition | undefined {
  return THEME_REGISTRY.find((t) => t.name === name);
}
