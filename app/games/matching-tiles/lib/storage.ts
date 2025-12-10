import type { Difficulty } from "../types/game";
import { STORAGE_KEYS } from "./constants";

export function getBestScore(
  difficulty: Difficulty
): { time: number; moves: number } | null {
  try {
    const stored = localStorage.getItem(
      `${STORAGE_KEYS.BEST_SCORE}-${difficulty}`
    );
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveBestScore(
  difficulty: Difficulty,
  time: number,
  moves: number
): void {
  try {
    const current = getBestScore(difficulty);
    if (
      !current ||
      time < current.time ||
      (time === current.time && moves < current.moves)
    ) {
      localStorage.setItem(
        `${STORAGE_KEYS.BEST_SCORE}-${difficulty}`,
        JSON.stringify({ time, moves })
      );
    }
  } catch {
    // Ignore storage errors
  }
}

export function getSavedDifficulty(): Difficulty {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DIFFICULTY);
    if (stored && ["easy", "medium", "hard"].includes(stored)) {
      return stored as Difficulty;
    }
  } catch {
    // Ignore storage errors
  }
  return "easy";
}

export function saveDifficulty(difficulty: Difficulty): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DIFFICULTY, difficulty);
  } catch {
    // Ignore storage errors
  }
}
