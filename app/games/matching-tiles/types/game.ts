export type Difficulty = "easy" | "medium" | "hard";

export type Card = {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameState = {
  cards: Card[];
  flippedCards: string[]; // Array of card IDs
  matchedPairs: number;
  moves: number;
  timerRunning: boolean;
  elapsedTime: number; // in seconds
  difficulty: Difficulty;
  isGameComplete: boolean;
  bestScore: {
    time: number;
    moves: number;
  } | null;
};

export type GameConfig = {
  rows: number;
  cols: number;
  totalPairs: number;
};
