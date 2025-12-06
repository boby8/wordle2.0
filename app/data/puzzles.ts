import type { Puzzle } from "../types/game";

export const puzzles: Puzzle[] = [
  {
    id: "1",
    requiredLength: 9,
    answer: "CONTAINER",
    emojis: ["🧃", "🍌", "🍓"],
    maxAttempts: 6,
  },
  {
    id: "2",
    requiredLength: 8,
    answer: "BEVERAGE",
    emojis: ["🥤", "🍹", "☕"],
    maxAttempts: 6,
  },
  {
    id: "3",
    requiredLength: 5,
    answer: "APPLE",
    emojis: ["🍎", "🍏"],
    maxAttempts: 6,
  },
];

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find((p) => p.id === id);
}

export function getRandomPuzzle(): Puzzle {
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}
