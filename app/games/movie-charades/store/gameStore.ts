"use client";

import { create } from "zustand";
import type { Category, GameState, Movie } from "../types/game";
import { getMoviesByCategory } from "../data/movies";
import { getRandomMovie, isAnswerCorrect } from "../lib/gameLogic";

interface GameStore extends GameState {
  currentMovie: Movie | null;
  setCategory: (category: Category) => void;
  submitAnswer: (answer: string) => void;
  nextMovie: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  selectedCategory: "bollywood",
  currentMovieIndex: 0,
  score: 0,
  attempts: 0,
  isCorrect: null,
  usedMovieIds: [],
  isGameComplete: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  currentMovie: null,

  setCategory: (category: Category) => {
    const movies = getMoviesByCategory(category);
    const randomMovie = getRandomMovie(movies, []);

    set({
      ...initialState,
      selectedCategory: category,
      currentMovie: randomMovie,
      usedMovieIds: randomMovie ? [randomMovie.id] : [],
    });
  },

  submitAnswer: (answer: string) => {
    const { currentMovie } = get();
    if (!currentMovie) return;

    const correct = isAnswerCorrect(answer, currentMovie.title);
    const newAttempts = get().attempts + 1;
    const newScore = correct ? get().score + 1 : get().score;

    set({
      isCorrect: correct,
      attempts: newAttempts,
      score: newScore,
    });
  },

  nextMovie: () => {
    const { selectedCategory, usedMovieIds } = get();
    const movies = getMoviesByCategory(selectedCategory);
    const nextMovie = getRandomMovie(movies, usedMovieIds);

    if (!nextMovie) {
      // All movies used
      set({
        isGameComplete: true,
        currentMovie: null,
      });
      return;
    }

    set({
      currentMovie: nextMovie,
      currentMovieIndex: get().currentMovieIndex + 1,
      usedMovieIds: [...usedMovieIds, nextMovie.id],
      isCorrect: null,
      attempts: 0,
    });
  },

  resetGame: () => {
    const { selectedCategory } = get();
    get().setCategory(selectedCategory);
  },
}));
