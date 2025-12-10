"use client";

import { create } from "zustand";
import type { Difficulty, GameState } from "../types/game";
import { generateCards, doCardsMatch } from "../lib/gameLogic";
import {
  getBestScore,
  saveBestScore,
  getSavedDifficulty,
  saveDifficulty,
} from "../lib/storage";
import { DIFFICULTY_CONFIGS } from "../lib/constants";

interface GameStore extends GameState {
  initializeGame: (difficulty: Difficulty) => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  tickTimer: () => void;
}

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  timerRunning: false,
  elapsedTime: 0,
  difficulty: "easy",
  isGameComplete: false,
  bestScore: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  difficulty: getSavedDifficulty(),
  bestScore: getBestScore(getSavedDifficulty()),

  initializeGame: (difficulty: Difficulty) => {
    const cards = generateCards(difficulty);
    const bestScore = getBestScore(difficulty);

    set({
      ...initialState,
      cards,
      difficulty,
      bestScore,
      timerRunning: false,
      elapsedTime: 0,
    });
    saveDifficulty(difficulty);
  },

  flipCard: (cardId: string) => {
    const {
      cards,
      flippedCards,
      matchedPairs,
      moves,
      timerRunning,
      difficulty,
      isGameComplete,
    } = get();

    // Don't allow flipping if game is complete
    if (isGameComplete) return;

    // Don't allow flipping if already flipped or matched
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Don't allow flipping more than 2 cards at once
    if (flippedCards.length >= 2) return;

    // Start timer on first flip
    const shouldStartTimer = !timerRunning && flippedCards.length === 0;

    // Flip the card
    const updatedCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    const newFlippedCards = [...flippedCards, cardId];

    // If two cards are flipped, check for match
    if (newFlippedCards.length === 2) {
      const card1 = updatedCards.find((c) => c.id === newFlippedCards[0])!;
      const card2 = updatedCards.find((c) => c.id === newFlippedCards[1])!;
      const isMatch = doCardsMatch(card1, card2);
      const newMoves = moves + 1;

      if (isMatch) {
        // Mark as matched - keep them flipped (visible) but mark as matched
        const matchedCards = updatedCards.map((c) =>
          newFlippedCards.includes(c.id)
            ? { ...c, isMatched: true, isFlipped: true }
            : c
        );
        const newMatchedPairs = matchedPairs + 1;
        const config = DIFFICULTY_CONFIGS[difficulty];
        const isComplete = newMatchedPairs === config.totalPairs;

        if (isComplete) {
          // Game complete
          saveBestScore(difficulty, get().elapsedTime, newMoves);
          set({
            cards: matchedCards,
            flippedCards: [], // Clear flipped cards so user can see all matches
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            timerRunning: false,
            isGameComplete: true,
            bestScore: getBestScore(difficulty),
          });
        } else {
          // Match found - clear flippedCards array so user can continue
          set({
            cards: matchedCards,
            flippedCards: [], // Clear immediately so user can click other cards
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            timerRunning: shouldStartTimer || timerRunning,
          });
        }
      } else {
        // Not a match - flip back after delay
        // First, update state to show both cards flipped
        set({
          cards: updatedCards,
          flippedCards: newFlippedCards,
          moves: newMoves,
          timerRunning: shouldStartTimer || timerRunning,
        });

        // Then flip them back after delay
        setTimeout(() => {
          const currentState = get();
          const resetCards = currentState.cards.map((c) =>
            newFlippedCards.includes(c.id) && !c.isMatched
              ? { ...c, isFlipped: false }
              : c
          );
          set({
            cards: resetCards,
            flippedCards: [], // Clear after flip back
          });
        }, 800);
      }
    } else {
      // Only one card flipped
      set({
        cards: updatedCards,
        flippedCards: newFlippedCards,
        timerRunning: shouldStartTimer || timerRunning,
      });
    }
  },

  tickTimer: () => {
    const { timerRunning, isGameComplete } = get();
    if (timerRunning && !isGameComplete) {
      set((state) => ({
        elapsedTime: state.elapsedTime + 1,
      }));
    }
  },

  resetGame: () => {
    const { difficulty } = get();
    get().initializeGame(difficulty);
  },

  setDifficulty: (difficulty: Difficulty) => {
    saveDifficulty(difficulty);
    set({ difficulty, bestScore: getBestScore(difficulty) });
  },
}));
