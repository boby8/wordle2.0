export type GridCell = {
  emoji: string | null;
  correctEmoji: string;
  row: number;
  col: number;
  isCorrect: boolean | null;
};

export type GameState = {
  level: number;
  score: number;
  grid: GridCell[][];
  shuffledEmojis: string[];
  userPlacedEmojis: Map<string, { row: number; col: number; emoji: string }>;
  isShowing: boolean;
  showResultModal: boolean;
  startTime: number;
  elapsedTime: number;
  isGameOver: boolean;
  accuracy: number;
  rank: string;
};

export type LevelConfig = {
  rows: number;
  cols: number;
  emojiCount: number;
  showTime: number; // in seconds
};
