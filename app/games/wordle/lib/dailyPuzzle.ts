import type { Puzzle } from "../types/game";
import { emojiMappings } from "./emojiWordMapper";
import { GAME_CONSTANTS } from "./constants";

/**
 * Generate a deterministic puzzle based on date
 * Same date = same puzzle for all users
 * Uses UTC date to ensure consistency across timezones
 */
export function getDailyPuzzle(date?: Date): Puzzle {
  // Safety check: ensure emojiMappings is populated
  if (!emojiMappings || emojiMappings.length === 0) {
    throw new Error(
      "emojiMappings is empty or undefined. Cannot generate puzzle."
    );
  }

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

  // Safety check: ensure mapping is valid
  if (!emojiMapping || !emojiMapping.words || !emojiMapping.correctAnswer) {
    throw new Error(
      `Invalid emoji mapping at index ${mappingIndex}. Mapping: ${JSON.stringify(emojiMapping)}`
    );
  }

  const words = emojiMapping.words;

  // Log selected mapping
  console.log("Selected emoji mapping:", {
    index: mappingIndex,
    emojis: emojiMapping.emojis,
    correctAnswer: emojiMapping.correctAnswer,
    category: emojiMapping.category,
    wordsCount: words.length,
  });

  // Always use correctAnswer as the answer (fixed per emoji combination)
  const answer = emojiMapping.correctAnswer.toUpperCase();

  // Generate emoji array matching max attempts (6) by cycling through available emojis
  const baseEmojis = emojiMapping.emojis;
  const maxAttempts = GAME_CONSTANTS.GRID.MAX_ATTEMPTS;
  const emojis: string[] = [];

  for (let i = 0; i < maxAttempts; i++) {
    emojis.push(baseEmojis[i % baseEmojis.length]);
  }

  // Ensure allowedWords includes the answer (in case correctAnswer isn't in words array)
  const allowedWordsUpper = words.map((w) => w.toUpperCase());
  if (!allowedWordsUpper.includes(answer)) {
    console.warn(
      `Answer "${answer}" not in words array, adding it to allowedWords`
    );
    allowedWordsUpper.push(answer);
  }

  const puzzle = {
    id: `daily-${dateString}`,
    requiredLength: answer.length,
    answer,
    emojis,
    maxAttempts: GAME_CONSTANTS.GRID.MAX_ATTEMPTS,
    allowedWords: allowedWordsUpper,
  };

  // Log generated puzzle for debugging
  console.log("Generated puzzle:", {
    id: puzzle.id,
    answer: puzzle.answer,
    answerLength: puzzle.answer.length,
    requiredLength: puzzle.requiredLength,
    emojisCount: puzzle.emojis.length,
    allowedWordsCount: puzzle.allowedWords.length,
    answerInAllowedWords: puzzle.allowedWords.includes(puzzle.answer),
  });

  return puzzle;
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
