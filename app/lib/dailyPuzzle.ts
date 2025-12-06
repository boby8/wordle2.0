import type { Puzzle } from "../types/game";
import { emojiMappings } from "./emojiWordMapper";
import { GAME_CONSTANTS } from "./constants";

/**
 * Generate a deterministic puzzle based on date
 * Same date = same puzzle for all users
 * Uses UTC date to ensure consistency across timezones
 */
export function getDailyPuzzle(date?: Date): Puzzle {
  // Use UTC date to ensure consistency across timezones
  // If no date provided, use current UTC date
  const now = date || new Date();
  const dateString = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
    .toISOString()
    .split("T")[0]; // YYYY-MM-DD in UTC
  const seed = hashString(dateString);

  // Get emoji mapping based on seed (deterministic)
  const mappingIndex = seed % emojiMappings.length;
  const emojiMapping = emojiMappings[mappingIndex];
  const words = emojiMapping.words;

  // Select word based on seed
  const wordIndex = seed % words.length;
  const answer = words[wordIndex].toUpperCase();

  return {
    id: `daily-${dateString}`,
    requiredLength: answer.length,
    answer,
    emojis: emojiMapping.emojis,
    maxAttempts: GAME_CONSTANTS.GRID.MAX_ATTEMPTS,
  };
}

/**
 * Simple string hash function for deterministic selection
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Check if puzzle is today's daily puzzle
 */
export function isDailyPuzzle(puzzle: Puzzle): boolean {
  return puzzle.id.startsWith("daily-");
}
