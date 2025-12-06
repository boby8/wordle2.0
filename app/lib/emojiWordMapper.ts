// Emoji to word mapping for puzzle generation
// This maps emoji combinations to potential words

export type EmojiCategory =
  | "food"
  | "drink"
  | "animal"
  | "object"
  | "nature"
  | "activity";

export interface EmojiWordMapping {
  emojis: string[];
  words: string[];
  category: EmojiCategory;
}

// Pre-defined emoji-to-word mappings
export const emojiMappings: EmojiWordMapping[] = [
  {
    emojis: ["🧃", "🍌", "🍓"],
    words: ["CONTAINER", "BEVERAGE", "SMOOTHIE", "JUICE"],
    category: "drink",
  },
  {
    emojis: ["🥤", "🍹", "☕"],
    words: ["BEVERAGE", "DRINK", "REFRESHMENT"],
    category: "drink",
  },
  {
    emojis: ["🍎", "🍏"],
    words: ["APPLE", "FRUIT"],
    category: "food",
  },
  {
    emojis: ["🐶", "🐱"],
    words: ["PET", "ANIMAL", "COMPANION"],
    category: "animal",
  },
  {
    emojis: ["🌞", "🌙"],
    words: ["DAY", "NIGHT", "TIME"],
    category: "nature",
  },
  {
    emojis: ["🚗", "🚲"],
    words: ["VEHICLE", "TRANSPORT"],
    category: "object",
  },
  {
    emojis: ["⚽", "🏀"],
    words: ["SPORT", "GAME", "BALL"],
    category: "activity",
  },
  {
    emojis: ["📱", "💻"],
    words: ["DEVICE", "TECHNOLOGY", "ELECTRONIC"],
    category: "object",
  },
  {
    emojis: ["🍕", "🍔"],
    words: ["FOOD", "MEAL", "FASTFOOD"],
    category: "food",
  },
  {
    emojis: ["🌊", "🏖️"],
    words: ["BEACH", "OCEAN", "VACATION"],
    category: "nature",
  },
];

/**
 * Find words that match given emojis
 */
export function findWordsByEmojis(emojis: string[]): string[] {
  const matching = emojiMappings.find(
    (mapping) =>
      emojis.length === mapping.emojis.length &&
      emojis.every((emoji) => mapping.emojis.includes(emoji))
  );

  return matching ? matching.words : [];
}

/**
 * Get random emoji mapping for puzzle generation
 */
export function getRandomEmojiMapping(): EmojiWordMapping {
  return emojiMappings[Math.floor(Math.random() * emojiMappings.length)];
}

/**
 * Generate puzzle from emojis (for daily puzzles)
 */
export function generatePuzzleFromEmojis(
  emojis: string[]
): { answer: string; requiredLength: number } | null {
  const words = findWordsByEmojis(emojis);
  if (words.length === 0) return null;

  // Pick a random word from matches
  const answer = words[Math.floor(Math.random() * words.length)];
  return {
    answer: answer.toUpperCase(),
    requiredLength: answer.length,
  };
}
