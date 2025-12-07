"use client";

import { useEffect, useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../contexts/ThemeContext";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import EmojiHints from "./EmojiHints";
import PlayAgainButton from "./PlayAgainButton";
import ThemeSwitcher from "./ThemeSwitcher";

export default function GameController() {
  const {
    addLetter,
    removeLetter,
    submitGuess,
    isGameOver,
    hasWon,
    puzzle,
    errorMessage,
  } = useGameStore();
  const { theme } = useTheme();

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (isGameOver) return;

      if (e.key === "Enter") {
        e.preventDefault();
        submitGuess();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        addLetter(e.key);
      }
    },
    [isGameOver, addLetter, removeLetter, submitGuess]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  if (!puzzle) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
        <div className="text-[var(--text)] text-xl">Loading puzzle...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 text-[var(--text)] transition-colors relative">
      <div
        className={`fixed inset-0 -z-10 transition-all duration-500 ${
          theme === "christmas"
            ? "theme-christmas-bg"
            : theme === "vintage"
            ? "theme-vintage-bg"
            : theme === "light"
            ? "theme-light-bg"
            : theme === "dark"
            ? "theme-dark-bg"
            : theme === "geometric"
            ? "theme-geometric-bg"
            : theme === "sunset"
            ? "theme-sunset-bg"
            : "bg-[var(--bg)]"
        }`}
        style={
          theme === "christmas" ||
          theme === "vintage" ||
          theme === "light" ||
          theme === "dark" ||
          theme === "geometric" ||
          theme === "sunset"
            ? { zIndex: -10 }
            : undefined
        }
      ></div>
      <ThemeSwitcher />

      <div className="w-full max-w-3xl rounded-xl p-6 sm:p-8 flex flex-col items-center shadow-2xl">
        <div className="mb-4 text-xl sm:text-2xl font-bold w-full">
          <div className="text-center">Wordable</div>
          {isGameOver && (
            <div className="text-center mt-4">
              {hasWon ? (
                <div className="text-[var(--success)] text-2xl sm:text-3xl animate-bounce">
                  🎉 You Won! 🎉
                </div>
              ) : (
                <div className="text-[var(--present)] text-xl sm:text-2xl animate-pulse">
                  Game Over! Answer:{" "}
                  <span className="font-mono">{puzzle.answer}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <EmojiHints />
        {errorMessage && (
          <div className="mt-4 px-4 py-2 bg-[var(--error)] text-white rounded-lg text-sm font-medium animate-pulse w-full text-center">
            {errorMessage}
          </div>
        )}
        <div className="mt-6 sm:mt-8 w-full flex justify-center">
          <Grid />
        </div>
        <div className="w-full mt-6 sm:mt-8">
          <Keyboard />
        </div>

        {isGameOver && <PlayAgainButton />}
      </div>
    </div>
  );
}
