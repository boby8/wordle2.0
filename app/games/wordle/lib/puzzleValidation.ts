import type { Puzzle } from "../types/game";
import { GAME_CONSTANTS } from "./constants";

/**
 * Validates puzzle data structure and content
 */
export function validatePuzzle(puzzle: unknown): puzzle is Puzzle {
  if (!puzzle || typeof puzzle !== "object") {
    console.error("[validatePuzzle] Puzzle is null or not an object:", puzzle);
    return false;
  }

  const p = puzzle as Record<string, unknown>;

  // Check required fields
  const fieldChecks = {
    id: typeof p.id === "string",
    answer: typeof p.answer === "string",
    emojis: Array.isArray(p.emojis),
    requiredLength: typeof p.requiredLength === "number",
    maxAttempts: typeof p.maxAttempts === "number",
    allowedWords: Array.isArray(p.allowedWords),
  };

  if (!Object.values(fieldChecks).every(Boolean)) {
    console.error("[validatePuzzle] Missing or invalid fields:", {
      puzzle: p,
      checks: fieldChecks,
    });
    return false;
  }

  // Validate answer
  const answer = (p.answer as string).toUpperCase();
  if (
    answer.length === 0 ||
    answer.length > GAME_CONSTANTS.GRID.FIXED_WIDTH ||
    !/^[A-Z]+$/.test(answer)
  ) {
    console.error("[validatePuzzle] Invalid answer:", {
      answer,
      length: answer.length,
      maxLength: GAME_CONSTANTS.GRID.FIXED_WIDTH,
      isAlpha: /^[A-Z]+$/.test(answer),
    });
    return false;
  }

  // Check if answer is in the allowedWords array
  const allowedWords = (p.allowedWords as string[]).map((w) => w.toUpperCase());
  if (!allowedWords.includes(answer)) {
    console.error("[validatePuzzle] Answer not in allowedWords:", {
      answer,
      allowedWordsCount: allowedWords.length,
      allowedWordsSample: allowedWords.slice(0, 5),
      answerInList: allowedWords.includes(answer),
    });
    return false;
  }

  // Validate required length matches answer
  if (p.requiredLength !== answer.length) {
    console.error("[validatePuzzle] Required length mismatch:", {
      requiredLength: p.requiredLength,
      answerLength: answer.length,
    });
    return false;
  }

  // Validate emojis
  if ((p.emojis as string[]).length === 0) {
    console.error("[validatePuzzle] No emojis:", {
      emojis: p.emojis,
    });
    return false;
  }

  // Validate max attempts
  if ((p.maxAttempts as number) < 1 || (p.maxAttempts as number) > 10) {
    console.error("[validatePuzzle] Invalid maxAttempts:", {
      maxAttempts: p.maxAttempts,
    });
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
