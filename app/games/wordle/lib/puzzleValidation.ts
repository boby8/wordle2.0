import type { Puzzle } from "../types/game";
import { GAME_CONSTANTS } from "./constants";

/**
 * Validates puzzle data structure and content
 */
export function validatePuzzle(puzzle: unknown): puzzle is Puzzle {
  if (!puzzle || typeof puzzle !== "object") {
    return false;
  }

  const p = puzzle as Record<string, unknown>;

  // Check required fields
  if (
    typeof p.id !== "string" ||
    typeof p.answer !== "string" ||
    !Array.isArray(p.emojis) ||
    typeof p.requiredLength !== "number" ||
    typeof p.maxAttempts !== "number" ||
    !Array.isArray(p.allowedWords)
  ) {
    return false;
  }

  // Validate answer
  const answer = p.answer.toUpperCase();
  if (
    answer.length === 0 ||
    answer.length > GAME_CONSTANTS.GRID.FIXED_WIDTH ||
    !/^[A-Z]+$/.test(answer)
  ) {
    return false;
  }

  // Check if answer is in the allowedWords array
  const allowedWords = (p.allowedWords as string[]).map((w) => w.toUpperCase());
  if (!allowedWords.includes(answer)) {
    return false;
  }

  // Validate required length matches answer
  if (p.requiredLength !== answer.length) {
    return false;
  }

  // Validate emojis
  if (p.emojis.length === 0) {
    return false;
  }

  // Validate max attempts
  if (p.maxAttempts < 1 || p.maxAttempts > 10) {
    return false;
  }

  return true;
}

/**
 * Safely get puzzle with validation
 */
export function getValidatedPuzzle(puzzle: unknown): Puzzle | null {
  return validatePuzzle(puzzle) ? puzzle : null;
}
