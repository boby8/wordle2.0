"use client";

import { create } from "zustand";
import type { Category, GameState, GameMode, GameItem } from "../types/game";
import { getMoviesByCategory } from "../data/movies";
import { getSongsByCategory } from "../data/songs";
import { getRandomItem, isAnswerCorrect } from "../lib/gameLogic";

interface GameStore extends GameState {
  currentItem: GameItem | null;
  setGameMode: (mode: GameMode) => void;
  setCategory: (category: Category) => void;
  submitAnswer: (answer: string) => void;
  nextItem: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  gameMode: "movies",
  selectedCategory: "bollywood",
  currentItemIndex: 0,
  score: 0,
  attempts: 0,
  isCorrect: null,
  usedItemIds: [],
  isGameComplete: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  currentItem: null,

  setGameMode: (mode: GameMode) => {
    const { selectedCategory } = get();
    set({ gameMode: mode });
    get().setCategory(selectedCategory);
  },

  setCategory: (category: Category) => {
    const { gameMode } = get();
    let items: GameItem[] = [];

    if (gameMode === "movies") {
      items = getMoviesByCategory(category);
    } else {
      items = getSongsByCategory(category);
    }

    const randomItem = getRandomItem(items, []);

    set({
      ...initialState,
      gameMode: get().gameMode,
      selectedCategory: category,
      currentItem: randomItem,
      usedItemIds: randomItem ? [randomItem.id] : [],
    });
  },

  submitAnswer: (answer: string) => {
    const { currentItem } = get();
    if (!currentItem) return;

    const correct = isAnswerCorrect(answer, currentItem.title);
    const newAttempts = get().attempts + 1;
    const newScore = correct ? get().score + 1 : get().score;

    set({
      isCorrect: correct,
      attempts: newAttempts,
      score: newScore,
    });
  },

  nextItem: () => {
    const { selectedCategory, usedItemIds, gameMode } = get();
    let items: GameItem[] = [];

    if (gameMode === "movies") {
      items = getMoviesByCategory(selectedCategory);
    } else {
      items = getSongsByCategory(selectedCategory);
    }

    const nextItem = getRandomItem(items, usedItemIds);

    if (!nextItem) {
      // All items used
      set({
        isGameComplete: true,
        currentItem: null,
      });
      return;
    }

    set({
      currentItem: nextItem,
      currentItemIndex: get().currentItemIndex + 1,
      usedItemIds: [...usedItemIds, nextItem.id],
      isCorrect: null,
      attempts: 0,
    });
  },

  resetGame: () => {
    const { selectedCategory, gameMode } = get();
    set({ ...initialState, gameMode, selectedCategory });
    get().setCategory(selectedCategory);
  },
}));
