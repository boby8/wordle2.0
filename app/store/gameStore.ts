"use client";

import { create } from "zustand";
import type { Puzzle, Attempt, GameState } from "../types/game";
import { evaluateGuess, normalizeGuess, isValidWord } from "../lib/gameLogic";
import { updateKeyboardState } from "../lib/keyboardState";
import { GAME_CONSTANTS } from "../lib/constants";
import { validatePuzzle } from "../lib/puzzleValidation";

interface GameStore extends GameState {
  initializeGame: (puzzle: Puzzle) => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
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
    // Validate puzzle before initializing
    if (!validatePuzzle(puzzle)) {
      console.error("Invalid puzzle data:", puzzle);
      set({
        ...initialState,
        errorMessage: "Invalid puzzle data",
      });
      return;
    }

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
    if (
      normalized &&
      /^[A-Z]$/.test(normalized) &&
      currentGuess.length < GAME_CONSTANTS.GRID.FIXED_WIDTH
    ) {
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
      set({ errorMessage: GAME_CONSTANTS.ERRORS.EMPTY_WORD });
      return;
    }

    if (normalized.length > GAME_CONSTANTS.GRID.FIXED_WIDTH) {
      set({ errorMessage: GAME_CONSTANTS.ERRORS.WORD_TOO_LONG });
      return;
    }

    if (!isValidWord(normalized)) {
      set({ errorMessage: GAME_CONSTANTS.ERRORS.INVALID_WORD });
      return;
    }

    const result = evaluateGuess(normalized, puzzle.answer);
    const newAttempt: Attempt = { guess: normalized, result };
    const newAttempts = [...attempts, newAttempt];
    const newRow = currentRow + 1;
    const hasWon = normalized === puzzle.answer.toUpperCase();
    const isGameOverNow = hasWon || newAttempts.length >= puzzle.maxAttempts;

    // Update keyboard state using utility function
    const keyboardState = updateKeyboardState(
      get().keyboardState,
      normalized,
      result
    );

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
}));
