"use client";

import { create } from "zustand";
import type { Puzzle, Attempt, GameState } from "../types/game";
import { evaluateGuess, normalizeGuess, isValidWord } from "../lib/gameLogic";
import { updateKeyboardState } from "../lib/keyboardState";
import { GAME_CONSTANTS } from "../lib/constants";
import { validatePuzzle } from "../lib/puzzleValidation";
import { updateStats } from "../lib/stats";

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
  revealedEmojis: 1, // Start with 1 emoji, reveal one more per attempt
  isGameOver: false,
  hasWon: false,
  keyboardState: {},
  errorMessage: null,
  invalidRowIndex: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  initializeGame: (puzzle: Puzzle) => {
    // Validate puzzle before initializing
    if (!puzzle || typeof puzzle !== "object" || Object.keys(puzzle).length === 0) {
      console.error("Invalid puzzle data: puzzle is empty or null", puzzle);
      set({
        ...initialState,
        errorMessage: "Failed to load puzzle. Please refresh the page.",
      });
      return;
    }

    if (!validatePuzzle(puzzle)) {
      console.error("Invalid puzzle data: validation failed", {
        id: puzzle?.id,
        hasAnswer: !!puzzle?.answer,
        hasEmojis: Array.isArray(puzzle?.emojis),
        emojisLength: puzzle?.emojis?.length,
        hasAllowedWords: Array.isArray(puzzle?.allowedWords),
      });
      set({
        ...initialState,
        errorMessage: "Invalid puzzle data. Please refresh the page.",
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

    if (!isValidWord(normalized, puzzle.allowedWords)) {
      set({
        errorMessage: GAME_CONSTANTS.ERRORS.INVALID_WORD,
        invalidRowIndex: currentRow,
      });
      // Clear invalid row and error message after animation
      setTimeout(() => {
        set({ invalidRowIndex: null, errorMessage: null });
      }, 2000);
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

    // Update stats when game ends
    if (isGameOverNow) {
      const attemptNumber = hasWon ? newAttempts.length : undefined;
      updateStats(hasWon, attemptNumber);
    }

    set({
      attempts: newAttempts,
      currentGuess: "",
      currentRow: newRow,
      // Reveal one more emoji per attempt, capped at total emoji count (which equals word length)
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
