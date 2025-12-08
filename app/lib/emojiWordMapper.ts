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
  correctAnswer: string; // Fixed answer for this emoji combination
}

// Pre-defined emoji-to-word mappings
export const emojiMappings: EmojiWordMapping[] = [
  {
    emojis: ["🧃", "🍌", "🍓"],
    words: [
      "CONTAINER",
      "BEVERAGE",
      "SMOOTHIE",
      "JUICE",
      "DRINK",
      "SHAKE",
      "FRUIT",
      "BANANA",
      "STRAWBERRY",
      "BLEND",
      "MIX",
      "LIQUID",
      "REFRESH",
      "COOL",
      "SWEET",
      "TASTE",
      "FLAVOR",
      "YOGURT",
      "MILK",
    ],
    category: "drink",
    correctAnswer: "smoothie",
  },
  {
    emojis: ["🥤", "🍹", "☕"],
    words: [
      "BEVERAGE",
      "DRINK",
      "REFRESHMENT",
      "COFFEE",
      "TEA",
      "COCKTAIL",
      "SODA",
      "COLA",
      "WATER",
      "JUICE",
      "COOL",
      "HOT",
      "LIQUID",
      "CUPPA",
      "BREW",
      "SIP",
      "QUENCH",
      "THIRST",
      "REHYDRATE",
    ],
    category: "drink",
    correctAnswer: "beverage",
  },
  {
    emojis: ["🍎", "🍏"],
    words: [
      "APPLE",
      "FRUIT",
      "RED",
      "GREEN",
      "SWEET",
      "CRISP",
      "ORCHARD",
      "TREE",
      "SNACK",
      "HEALTHY",
      "VITAMIN",
      "CORE",
      "SEED",
      "PIE",
      "JUICE",
      "CIDER",
      "POMEGRANATE",
      "PEAR",
    ],
    category: "food",
    correctAnswer: "fruits",
  },
  {
    emojis: ["🐶", "🐱"],
    words: [
      "PET",
      "ANIMAL",
      "COMPANION",
      "DOG",
      "CAT",
      "FRIEND",
      "LOVE",
      "CUTE",
      "FURRY",
      "PLAYFUL",
      "LOYAL",
      "FRIENDLY",
      "DOMESTIC",
      "HOUSE",
      "HOME",
      "CARE",
      "FAMILY",
      "BUDDY",
      "PAL",
    ],
    category: "animal",
    correctAnswer: "pet",
  },
  {
    emojis: ["🌞", "🌙"],
    words: [
      "DAY",
      "NIGHT",
      "TIME",
      "SUN",
      "MOON",
      "LIGHT",
      "DARK",
      "DAWN",
      "DUSK",
      "MORNING",
      "EVENING",
      "SKY",
      "STAR",
      "BRIGHT",
      "SHINE",
      "CYCLE",
      "HOUR",
      "CLOCK",
      "PERIOD",
    ],
    category: "nature",
    correctAnswer: "time",
  },
  {
    emojis: ["🚗", "🚲"],
    words: [
      "VEHICLE",
      "TRANSPORT",
      "CAR",
      "BIKE",
      "BICYCLE",
      "AUTO",
      "RIDE",
      "WHEEL",
      "ROAD",
      "TRAVEL",
      "MOVE",
      "SPEED",
      "PEDAL",
      "DRIVE",
      "MOTOR",
      "ENGINE",
      "CYCLE",
      "MOBILE",
      "MOTION",
    ],
    category: "object",
    correctAnswer: "vehicle",
  },
  {
    emojis: ["⚽", "🏀"],
    words: [
      "SPORT",
      "GAME",
      "BALL",
      "SOCCER",
      "FOOTBALL",
      "BASKETBALL",
      "PLAY",
      "TEAM",
      "SCORE",
      "GOAL",
      "FIELD",
      "COURT",
      "ATHLETE",
      "COMPETE",
      "MATCH",
      "ROUND",
      "ROUNDBALL",
      "SPHERE",
      "KICK",
      "THROW",
    ],
    category: "activity",
    correctAnswer: "sport",
  },
  {
    emojis: ["📱", "💻"],
    words: [
      "DEVICE",
      "TECHNOLOGY",
      "ELECTRONIC",
      "PHONE",
      "MOBILE",
      "COMPUTER",
      "LAPTOP",
      "SCREEN",
      "DIGITAL",
      "SMART",
      "TECH",
      "GADGET",
      "TOOL",
      "MACHINE",
      "KEYBOARD",
      "TOUCH",
      "APP",
      "SOFTWARE",
      "HARDWARE",
    ],
    category: "object",
    correctAnswer: "device",
  },
  {
    emojis: ["🍕", "🍔"],
    words: [
      "FOOD",
      "MEAL",
      "FASTFOOD",
      "PIZZA",
      "BURGER",
      "HAMBURGER",
      "CHEESE",
      "BREAD",
      "SNACK",
      "LUNCH",
      "DINNER",
      "TAKEOUT",
      "RESTAURANT",
      "EAT",
      "TASTE",
      "DELICIOUS",
      "SAVORY",
      "YUMMY",
      "TASTY",
    ],
    category: "food",
    correctAnswer: "fastfood",
  },
  {
    emojis: ["🌊", "🏖️"],
    words: [
      "BEACH",
      "OCEAN",
      "VACATION",
      "WAVE",
      "SAND",
      "SEA",
      "WATER",
      "SURF",
      "SHORE",
      "COAST",
      "SUNSET",
      "RELAX",
      "HOLIDAY",
      "TRAVEL",
      "SWIM",
      "SUN",
      "TROPICAL",
      "ISLAND",
      "PARADISE",
    ],
    category: "nature",
    correctAnswer: "beach",
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
