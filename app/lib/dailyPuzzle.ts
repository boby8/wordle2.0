import type { Puzzle } from "../types/game";
import { getRandomEmojiMapping } from "./emojiWordMapper";

/**
 * Generate a deterministic puzzle based on date
 * Same date = same puzzle for all users
 */
export function getDailyPuzzle(date: Date = new Date()): Puzzle {
  // Use date as seed for deterministic puzzle selection
  const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const seed = hashString(dateString);

  // Get emoji mapping based on seed
  const emojiMapping = getRandomEmojiMapping();
  const words = emojiMapping.words;

  // Select word based on seed
  const wordIndex = seed % words.length;
  const answer = words[wordIndex].toUpperCase();

  return {
    id: `daily-${dateString}`,
    requiredLength: answer.length,
    answer,
    emojis: emojiMapping.emojis,
    maxAttempts: 6,
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
