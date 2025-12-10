import type { Card, Difficulty } from "../types/game";
import { DIFFICULTY_CONFIGS, EMOJI_POOL } from "./constants";

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate cards for the game based on difficulty
 */
export function generateCards(difficulty: Difficulty): Card[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const emojis = shuffleArray(EMOJI_POOL).slice(0, config.totalPairs);

  // Create pairs
  const cards: Card[] = [];
  emojis.forEach((emoji, index) => {
    // Add two cards with the same emoji
    cards.push({
      id: `${emoji}-${index}-1`,
      emoji,
      isFlipped: false, // Always start face down
      isMatched: false,
    });
    cards.push({
      id: `${emoji}-${index}-2`,
      emoji,
      isFlipped: false, // Always start face down
      isMatched: false,
    });
  });

  // Shuffle the cards
  return shuffleArray(cards);
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Check if two cards match
 */
export function doCardsMatch(card1: Card, card2: Card): boolean {
  return card1.emoji === card2.emoji;
}
