"use client";

import { useEffect, useCallback } from "react";
import { useGameStore } from "../store/gameStore";
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-[var(--bg)] text-[var(--text)] transition-colors">
      <ThemeSwitcher />
      <div className="mb-4 text-xl sm:text-2xl font-bold">
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
        <div className="mt-4 px-4 py-2 bg-[var(--error)] text-white rounded-lg text-sm font-medium animate-pulse">
          {errorMessage}
        </div>
      )}
      <div className="mt-6 sm:mt-8">
        <Grid />
      </div>
      <Keyboard />

      {isGameOver && <PlayAgainButton />}
    </div>
  );
}
