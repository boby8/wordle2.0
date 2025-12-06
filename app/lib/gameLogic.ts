import type { CellState, Attempt } from "../types/game";
import { isValidEnglishWord } from "./wordDictionary";

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
  const maxGuessLength = Math.max(
    requiredLength,
    ...attempts.map((a) => a.guess.length),
    currentGuess.length
  );

  return {
    width: maxGuessLength,
    height: attempts.length + (currentGuess.length > 0 ? 1 : 0),
  };
}

export function isValidWord(word: string): boolean {
  // Basic format check
  if (!/^[A-Z]+$/.test(word) || word.length === 0) {
    return false;
  }
  // Check against English dictionary
  return isValidEnglishWord(word);
}
