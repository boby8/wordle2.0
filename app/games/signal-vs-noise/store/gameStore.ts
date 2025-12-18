"use client";

import { create } from "zustand";
import type { GameState } from "../types/game";
import {
  spawnItem,
  isItemExpired,
  updateItemPosition,
  selectRandomRule,
  isSignalItem,
  calculateAccuracy,
  getNextDifficulty,
} from "../lib/gameLogic";
import {
  DIFFICULTY_LEVELS,
  INITIAL_LIVES,
  calculateMastery,
} from "../lib/constants";
import { updateStats } from "../lib/storage";

interface GameStore extends GameState {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  clickItem: (itemId: string) => void;
  advanceRound: () => void;
  resetGame: () => void;
  updateItems: () => void;
  spawnNewItem: () => void;
}

const initialState: GameState = {
  isPlaying: false,
  isPaused: false,
  round: 1,
  score: 0,
  lives: INITIAL_LIVES,
  combo: 0,
  maxCombo: 0,
  items: [],
  activeRule: null,
  difficulty: DIFFICULTY_LEVELS[0],
  startTime: 0,
  elapsedTime: 0,
  itemsClicked: 0,
  signalsHit: 0,
  noiseHit: 0,
  isGameOver: false,
  showResultModal: false,
  masteryLevel: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const difficulty = DIFFICULTY_LEVELS[0];
    const rule = selectRandomRule(difficulty);

    set({
      ...initialState,
      isPlaying: true,
      difficulty,
      activeRule: rule,
      startTime: Date.now(),
    });
  },

  pauseGame: () => {
    set({ isPaused: true });
  },

  resumeGame: () => {
    set({ isPaused: false });
  },

  clickItem: (itemId: string) => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver) return;

    const item = state.items.find((i) => i.id === itemId);
    if (!item) return;

    const context = {
      round: state.round,
      score: state.score,
      itemsSpawned: state.itemsClicked,
      signalCount: state.signalsHit,
      noiseCount: state.noiseHit,
      combo: state.combo,
    };

    const isSignal = isSignalItem(item, state.activeRule, context);

    // Remove clicked item
    const newItems = state.items.filter((i) => i.id !== itemId);

    let newScore = state.score;
    let newLives = state.lives;
    let newCombo = 0;
    let newSignalsHit = state.signalsHit;
    let newNoiseHit = state.noiseHit;

    if (isSignal) {
      // Hit signal - score points
      newScore += 10;
      newSignalsHit++;
      newCombo = state.combo + 1;
    } else {
      // Hit noise - lose life and break combo
      newLives--;
      newNoiseHit++;
      newCombo = 0;
    }

    // Combo bonus
    if (newCombo >= 3) {
      newScore += newCombo * 5;
    }

    const newMaxCombo = Math.max(state.maxCombo, newCombo);
    const isGameOver = newLives <= 0;

    if (isGameOver) {
      const accuracy = calculateAccuracy(newSignalsHit, newNoiseHit);
      const mastery = calculateMastery(accuracy, state.round, newMaxCombo);
      updateStats(
        newScore,
        newMaxCombo,
        newSignalsHit,
        newNoiseHit,
        state.round,
        accuracy,
        mastery
      );
    }

    set({
      items: newItems,
      score: newScore,
      lives: newLives,
      combo: newCombo,
      maxCombo: newMaxCombo,
      itemsClicked: state.itemsClicked + 1,
      signalsHit: newSignalsHit,
      noiseHit: newNoiseHit,
      isGameOver,
      showResultModal: isGameOver,
    });
  },

  advanceRound: () => {
    const state = get();
    const nextDifficulty = getNextDifficulty(state.difficulty.level);

    if (!nextDifficulty) {
      // Max difficulty reached, stay at current
      const newRule = selectRandomRule(state.difficulty);
      set({
        round: state.round + 1,
        activeRule: newRule,
        items: [],
        combo: 0,
      });
      return;
    }

    const newRule = selectRandomRule(nextDifficulty);

    set({
      round: state.round + 1,
      difficulty: nextDifficulty,
      activeRule: newRule,
      items: [],
      combo: 0,
    });
  },

  resetGame: () => {
    set(initialState);
  },

  updateItems: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver) return;

    // Remove expired items
    const newItems = state.items
      .filter((item) => !isItemExpired(item))
      .map((item) => updateItemPosition(item));

    // Update elapsed time
    const elapsedTime = (Date.now() - state.startTime) / 1000;

    set({
      items: newItems,
      elapsedTime,
    });
  },

  spawnNewItem: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver) return;
    if (state.items.length >= state.difficulty.maxItemsOnScreen) return;

    const context = {
      round: state.round,
      score: state.score,
      itemsSpawned: state.itemsClicked,
      signalCount: state.signalsHit,
      noiseCount: state.noiseHit,
      combo: state.combo,
    };

    const newItem = spawnItem(state.activeRule, state.difficulty, context);

    set({
      items: [...state.items, newItem],
    });
  },
}));
