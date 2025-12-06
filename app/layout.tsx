import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DEFAULT_THEME } from "./lib/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordable - Emoji Word Puzzle Game",
  description: "A dynamic Wordle-style puzzle game with emoji hints",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const themes = {
                  light: 'theme-light',
                  dark: 'theme-dark',
                  cowprint: 'theme-cowprint',
                  watercolor: 'theme-watercolor',
                  floral: 'theme-floral',
                  sunset: 'theme-sunset',
                  vintage: 'theme-vintage',
                  geometric: 'theme-geometric'
                };
                const savedTheme = localStorage.getItem('theme') || '${DEFAULT_THEME}';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                const className = themes[theme] || themes['${DEFAULT_THEME}'];
                const root = document.documentElement;
                Object.values(themes).forEach(cls => root.classList.remove(cls));
                root.classList.add(className);
                root.style.colorScheme = (theme === 'dark') ? 'dark' : 'light';
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
