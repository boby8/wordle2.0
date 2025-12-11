"use client";

import { create } from "zustand";
import type { GameState, GridCell } from "../types/game";
import {
  generateGrid,
  shuffleEmojis,
  calculateScore,
  calculateAccuracy,
  canProceedToNextLevel,
} from "../lib/gameLogic";
import { LEVEL_CONFIGS, MAX_LEVEL, getRank } from "../lib/constants";

interface GameStore extends GameState {
  startGame: () => void;
  startRound: () => void;
  hideEmojis: () => void;
  placeEmoji: (row: number, col: number, emoji: string) => void;
  removeEmoji: (row: number, col: number) => void;
  checkAnswers: () => void;
  nextLevel: () => void;
  retryLevel: () => void;
  resetGame: () => void;
  updateElapsedTime: (time: number) => void;
}

const initialState: GameState = {
  level: 1,
  score: 0,
  grid: [],
  shuffledEmojis: [],
  userPlacedEmojis: new Map(),
  isShowing: false,
  showResultModal: false,
  startTime: 0,
  elapsedTime: 0,
  isGameOver: false,
  accuracy: 0,
  rank: "",
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const grid = generateGrid(1);
    const emojis = grid
      .flat()
      .map((cell) => cell.correctEmoji)
      .filter((emoji) => emoji !== "");
    const shuffled = shuffleEmojis(emojis);

    set({
      level: 1,
      score: 0,
      grid,
      shuffledEmojis: shuffled,
      userPlacedEmojis: new Map(),
      isShowing: false,
      showResultModal: false,
      startTime: 0,
      elapsedTime: 0,
      isGameOver: false,
      accuracy: 0,
      rank: "",
    });
  },

  startRound: () => {
    const { level } = get();
    const grid = generateGrid(level);
    const emojis = grid
      .flat()
      .map((cell) => cell.correctEmoji)
      .filter((emoji) => emoji !== "");
    const shuffled = shuffleEmojis(emojis);

    // Show emojis initially (keep them visible)
    set({
      grid,
      shuffledEmojis: shuffled,
      userPlacedEmojis: new Map(),
      isShowing: true,
      showResultModal: false,
      startTime: Date.now(),
      elapsedTime: 0,
    });

    // Auto-hide after show time
    const config = LEVEL_CONFIGS[level] || LEVEL_CONFIGS[5];
    setTimeout(() => {
      get().hideEmojis();
    }, config.showTime * 1000);
  },

  hideEmojis: () => {
    const grid = get().grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        emoji: null,
      }))
    );
    set({ grid, isShowing: false });
  },

  placeEmoji: (row: number, col: number, emoji: string) => {
    const { grid, userPlacedEmojis } = get();
    const key = `${row}-${col}`;

    // Remove emoji from previous position if exists
    const newPlacedEmojis = new Map(userPlacedEmojis);
    for (const [k, value] of newPlacedEmojis.entries()) {
      if (value.emoji === emoji && k !== key) {
        newPlacedEmojis.delete(k);
        break;
      }
    }

    // Add to new position
    newPlacedEmojis.set(key, { row, col, emoji });

    // Update grid
    const newGrid = grid.map((r, rIdx) =>
      r.map((cell, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return { ...cell, emoji };
        }
        // Clear if emoji was moved
        if (cell.emoji === emoji && (rIdx !== row || cIdx !== col)) {
          return { ...cell, emoji: null };
        }
        return cell;
      })
    );

    set({ grid: newGrid, userPlacedEmojis: newPlacedEmojis });

    // Auto-check when all slots filled
    const totalSlots = grid.flat().filter((c) => c.correctEmoji !== "").length;
    if (newPlacedEmojis.size === totalSlots) {
      setTimeout(() => {
        get().checkAnswers();
      }, 500);
    }
  },

  removeEmoji: (row: number, col: number) => {
    const { grid, userPlacedEmojis } = get();
    const key = `${row}-${col}`;
    const newPlacedEmojis = new Map(userPlacedEmojis);
    newPlacedEmojis.delete(key);

    const newGrid = grid.map((r, rIdx) =>
      r.map((cell, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return { ...cell, emoji: null };
        }
        return cell;
      })
    );

    set({ grid: newGrid, userPlacedEmojis: newPlacedEmojis });
  },

  checkAnswers: () => {
    const { grid, userPlacedEmojis, startTime, level, score } = get();
    const elapsedTime = (Date.now() - startTime) / 1000; // seconds

    let correct = 0;
    let wrong = 0;

    const newGrid = grid.map((row) =>
      row.map((cell) => {
        if (cell.correctEmoji === "") {
          return cell;
        }

        const key = `${cell.row}-${cell.col}`;
        const userPlacement = userPlacedEmojis.get(key);

        if (!userPlacement) {
          wrong++;
          return { ...cell, isCorrect: false };
        }

        if (userPlacement.emoji === cell.correctEmoji) {
          correct++;
          return { ...cell, emoji: userPlacement.emoji, isCorrect: true };
        } else {
          wrong++;
          return { ...cell, emoji: userPlacement.emoji, isCorrect: false };
        }
      })
    );

    const total = correct + wrong;
    const accuracy = calculateAccuracy(correct, total);
    const rank = getRank(accuracy);
    const roundScore = calculateScore(correct, wrong, elapsedTime);
    const newScore = score + roundScore;

    set({
      grid: newGrid,
      accuracy,
      rank,
      score: newScore,
      elapsedTime,
      showResultModal: true,
      isGameOver: level >= MAX_LEVEL && canProceedToNextLevel(accuracy),
    });
  },

  nextLevel: () => {
    const { level } = get();
    if (level >= MAX_LEVEL) {
      set({ isGameOver: true });
      return;
    }

    set({ level: level + 1, showResultModal: false });
    get().startRound();
  },

  retryLevel: () => {
    set({ showResultModal: false });
    get().startRound();
  },

  resetGame: () => {
    set(initialState);
  },

  updateElapsedTime: (time: number) => {
    set({ elapsedTime: time });
  },
}));
