export type CellState = "empty" | "correct" | "present" | "absent";

export type Puzzle = {
  id: string;
  requiredLength: number;
  answer: string;
  emojis: string[];
  maxAttempts: number;
  allowedWords: string[]; // Words that can be guessed for this puzzle
};

export type Attempt = {
  guess: string;
  result: CellState[];
};

export type GameState = {
  puzzle: Puzzle | null;
  attempts: Attempt[];
  currentGuess: string;
  currentRow: number;
  revealedEmojis: number;
  isGameOver: boolean;
  hasWon: boolean;
  keyboardState: Record<string, CellState>;
  errorMessage: string | null;
};
