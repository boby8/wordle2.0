"use client";

import { useTheme } from "../contexts/ThemeContext";
import { memo } from "react";

const ThemeSwitcher = memo(function ThemeSwitcher() {
  const { theme, setTheme, availableThemes, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 p-2 rounded-lg bg-[var(--keyboard-bg)] opacity-50">
        <div className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative group">
        <button
          className="p-2 rounded-lg bg-[var(--keyboard-bg)] hover:bg-[var(--keyboard-hover)] text-[var(--keyboard-text)] transition-all duration-200 shadow-lg border-0 hover:scale-110 active:scale-95"
          aria-label="Theme menu"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </button>

        <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg)] border-0 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out overflow-hidden transform group-hover:scale-100 scale-95 origin-top-right">
          <div className="py-1">
            {availableThemes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-all duration-200 ${
                  theme === t.name
                    ? "bg-[var(--highlight)] text-white transform scale-[1.02]"
                    : "text-[var(--text)] hover:bg-[var(--keyboard-bg)] hover:transform hover:translate-x-1"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <span>{t.label}</span>
                {theme === t.name && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ThemeSwitcher;
