"use client";

import { create } from "zustand";
import type { Puzzle, Attempt, GameState, CellState } from "../types/game";
import { evaluateGuess, normalizeGuess, isValidWord } from "../lib/gameLogic";

interface GameStore extends GameState {
  initializeGame: (puzzle: Puzzle) => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
  updateKeyboardState: (guess: string, result: CellState[]) => void;
}

const initialState: GameState = {
  puzzle: null,
  attempts: [],
  currentGuess: "",
  currentRow: 0,
  revealedEmojis: 1,
  isGameOver: false,
  hasWon: false,
  keyboardState: {},
  errorMessage: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  initializeGame: (puzzle: Puzzle) => {
    set({
      ...initialState,
      puzzle,
      revealedEmojis: 1,
      errorMessage: null,
    });
  },

  addLetter: (letter: string) => {
    const { currentGuess, puzzle, isGameOver } = get();
    if (isGameOver || !puzzle) return;

    const normalized = normalizeGuess(letter);
    if (normalized && /^[A-Z]$/.test(normalized)) {
      set({ currentGuess: currentGuess + normalized, errorMessage: null });
    }
  },

  removeLetter: () => {
    const { currentGuess, isGameOver } = get();
    if (isGameOver) return;

    set({ currentGuess: currentGuess.slice(0, -1) });
  },

  submitGuess: () => {
    const { currentGuess, puzzle, attempts, currentRow, isGameOver } = get();
    if (isGameOver || !puzzle) return;

    const normalized = normalizeGuess(currentGuess);

    // Clear previous error
    set({ errorMessage: null });

    if (!normalized) {
      set({ errorMessage: "Please enter a word" });
      return;
    }

    if (!isValidWord(normalized)) {
      set({ errorMessage: "Not a valid word" });
      return;
    }

    const result = evaluateGuess(normalized, puzzle.answer);
    const newAttempt: Attempt = { guess: normalized, result };
    const newAttempts = [...attempts, newAttempt];
    const newRow = currentRow + 1;
    const hasWon = normalized === puzzle.answer.toUpperCase();
    const isGameOverNow = hasWon || newAttempts.length >= puzzle.maxAttempts;

    // Update keyboard state
    const keyboardState = { ...get().keyboardState };
    for (let i = 0; i < normalized.length; i++) {
      const letter = normalized[i];
      const currentState = keyboardState[letter];
      const newState = result[i];

      // Only update if new state is better (correct > present > absent)
      if (
        !currentState ||
        newState === "correct" ||
        (newState === "present" && currentState === "absent")
      ) {
        keyboardState[letter] = newState;
      }
    }

    set({
      attempts: newAttempts,
      currentGuess: "",
      currentRow: newRow,
      revealedEmojis: Math.min(newAttempts.length + 1, puzzle.emojis.length),
      isGameOver: isGameOverNow,
      hasWon,
      keyboardState,
    });
  },

  resetGame: () => {
    const { puzzle } = get();
    if (puzzle) {
      get().initializeGame(puzzle);
    }
  },

  updateKeyboardState: (guess: string, result: CellState[]) => {
    const keyboardState = { ...get().keyboardState };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const currentState = keyboardState[letter];
      const newState = result[i];

      if (
        !currentState ||
        newState === "correct" ||
        (newState === "present" && currentState === "absent")
      ) {
        keyboardState[letter] = newState;
      }
    }
    set({ keyboardState });
  },
}));
