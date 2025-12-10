import type { CellState, Attempt } from "../types/game";
import { isValidEnglishWord } from "../../../shared/lib/wordDictionary";
import { GAME_CONSTANTS } from "./constants";

export function normalizeGuess(guess: string): string {
  return guess.toUpperCase().replace(/[^A-Z]/g, "");
}

export function evaluateGuess(guess: string, answer: string): CellState[] {
  const normalizedGuess = normalizeGuess(guess);
  const normalizedAnswer = answer.toUpperCase();
  const result: CellState[] = new Array(normalizedGuess.length).fill("absent");
  const answerCounts: Record<string, number> = {};
  const guessCounts: Record<string, number> = {};

  // Count letters in answer
  for (const letter of normalizedAnswer) {
    answerCounts[letter] = (answerCounts[letter] || 0) + 1;
  }

  // First pass: mark correct positions (green)
  for (let i = 0; i < normalizedGuess.length; i++) {
    if (normalizedGuess[i] === normalizedAnswer[i]) {
      result[i] = "correct";
      guessCounts[normalizedGuess[i]] =
        (guessCounts[normalizedGuess[i]] || 0) + 1;
    } else {
      console.log(
        `Position ${i}: ${normalizedGuess[i]} !== ${normalizedAnswer[i]}`
      );
    }
  }

  // Second pass: mark present but wrong position (yellow)
  for (let i = 0; i < normalizedGuess.length; i++) {
    if (result[i] === "correct") continue;

    const letter = normalizedGuess[i];
    const answerCount = answerCounts[letter] || 0;
    const guessCount = guessCounts[letter] || 0;

    if (answerCount > guessCount) {
      result[i] = "present";
      guessCounts[letter] = (guessCounts[letter] || 0) + 1;
    }
  }

  return result;
}

export function calculateGridDimensions(
  requiredLength: number,
  attempts: Attempt[],
  currentGuess: string
): { width: number; height: number } {
  return {
    width: GAME_CONSTANTS.GRID.FIXED_WIDTH,
    height: attempts.length + (currentGuess.length > 0 ? 1 : 0),
  };
}

export function isValidWord(word: string, allowedWords?: string[]): boolean {
  // Basic format check
  if (!/^[A-Z]+$/.test(word) || word.length === 0) {
    return false;
  }
  // Check length constraint
  if (word.length > GAME_CONSTANTS.GRID.FIXED_WIDTH) {
    return false;
  }

  // If allowedWords provided, only check against those (puzzle-specific words)
  if (allowedWords && allowedWords.length > 0) {
    return allowedWords.includes(word.toUpperCase());
  }

  // Fallback: Check against English dictionary (for backwards compatibility)
  return isValidEnglishWord(word);
}
