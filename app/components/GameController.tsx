"use client";

import { useEffect, useCallback, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../contexts/ThemeContext";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import EmojiHints from "./EmojiHints";
import PlayAgainButton from "./PlayAgainButton";
import ThemeSwitcher from "./ThemeSwitcher";
import StatisticsModal from "./StatisticsModal";
import HowToPlayModal from "./HowToPlayModal";
import Confetti from "./Confetti";
import ShareButton from "./ShareButton";
import DailyPuzzleIndicator from "./DailyPuzzleIndicator";

export default function GameController() {
  const {
    addLetter,
    removeLetter,
    submitGuess,
    isGameOver,
    hasWon,
    puzzle,
    errorMessage,
    attempts,
  } = useGameStore();
  const { theme } = useTheme();
  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

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
      <Confetti trigger={hasWon && isGameOver} />

      <div className="w-full max-w-3xl rounded-xl p-6 sm:p-8 flex flex-col items-center shadow-2xl">
        <DailyPuzzleIndicator puzzle={puzzle} />
        <div className="mb-6 sm:mb-8 w-full">
          <div className="flex items-center justify-between gap-4 relative py-3 px-4 rounded-lg bg-[var(--tile-empty)]/30 backdrop-blur-sm border border-[var(--tile-border)]/50 shadow-lg">
            <div className="flex gap-3">
              <button
                onClick={() => setShowHowToPlay(true)}
                className="w-10 h-10 flex items-center justify-center text-lg bg-[var(--keyboard-bg)] hover:bg-[var(--keyboard-hover)] text-[var(--keyboard-text)] rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="How to play"
              >
                ❓
              </button>
              <button
                onClick={() => setShowStats(true)}
                className="w-10 h-10 flex items-center justify-center text-lg bg-[var(--keyboard-bg)] hover:bg-[var(--keyboard-hover)] text-[var(--keyboard-text)] rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="Show statistics"
              >
                📊
              </button>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight drop-shadow-md">
                Wordable
              </h1>
            </div>
            <div className="w-[140px]"></div>
          </div>
          {isGameOver && (
            <div className="text-center mt-4 space-y-3">
              {hasWon ? (
                <>
                  <div className="text-[var(--success)] text-2xl sm:text-3xl animate-bounce">
                    🎉 You Won! 🎉
                  </div>
                  <div className="flex justify-center gap-3">
                    <ShareButton
                      attempts={attempts}
                      puzzle={puzzle}
                      hasWon={hasWon}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[var(--present)] text-xl sm:text-2xl animate-pulse">
                    Game Over! Answer:{" "}
                    <span className="font-mono">{puzzle.answer}</span>
                  </div>
                  <div className="flex justify-center gap-3">
                    <ShareButton
                      attempts={attempts}
                      puzzle={puzzle}
                      hasWon={hasWon}
                    />
                  </div>
                </>
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

      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
      <StatisticsModal isOpen={showStats} onClose={() => setShowStats(false)} />
    </div>
  );
}
