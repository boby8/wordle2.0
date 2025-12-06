import type { Puzzle } from "../types/game";
import { GAME_CONSTANTS } from "./constants";
import { isValidEnglishWord } from "./wordDictionary";

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
    typeof p.maxAttempts !== "number"
  ) {
    return false;
  }

  // Validate answer
  const answer = p.answer.toUpperCase();
  if (
    answer.length === 0 ||
    answer.length > GAME_CONSTANTS.GRID.FIXED_WIDTH ||
    !/^[A-Z]+$/.test(answer) ||
    !isValidEnglishWord(answer)
  ) {
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
