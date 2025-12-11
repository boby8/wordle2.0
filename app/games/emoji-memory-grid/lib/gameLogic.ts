import type { GridCell } from "../types/game";
import { EMOJI_POOL, LEVEL_CONFIGS } from "./constants";

export function generateGrid(level: number): GridCell[][] {
  const config = LEVEL_CONFIGS[level] || LEVEL_CONFIGS[5];
  const grid: GridCell[][] = [];
  const selectedEmojis = EMOJI_POOL.slice(0, config.emojiCount);

  let emojiIndex = 0;
  for (let row = 0; row < config.rows; row++) {
    const rowCells: GridCell[] = [];
    for (let col = 0; col < config.cols; col++) {
      if (emojiIndex < selectedEmojis.length) {
        rowCells.push({
          emoji: selectedEmojis[emojiIndex],
          correctEmoji: selectedEmojis[emojiIndex],
          row,
          col,
          isCorrect: null,
        });
        emojiIndex++;
      } else {
        rowCells.push({
          emoji: null,
          correctEmoji: "",
          row,
          col,
          isCorrect: null,
        });
      }
    }
    grid.push(rowCells);
  }

  return grid;
}

export function shuffleEmojis(emojis: string[]): string[] {
  const shuffled = [...emojis];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateScore(
  correct: number,
  wrong: number,
  time: number
): number {
  let score = correct * 10 - wrong * 2;
  if (time < 5) {
    score += 10;
  }
  return Math.max(0, score);
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function canProceedToNextLevel(accuracy: number): boolean {
  return accuracy >= 70;
}
