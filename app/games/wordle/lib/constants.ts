/**
 * Game constants
 */

export const GAME_CONSTANTS = {
  GRID: {
    FIXED_WIDTH: 12,
    MAX_ATTEMPTS: 6,
  },
  ERRORS: {
    EMPTY_WORD: "Please enter a word",
    INVALID_WORD: "Not a valid word",
    WORD_TOO_LONG: "Word is too long",
  },
} as const;
