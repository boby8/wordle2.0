export type ItemType = "signal" | "noise";

export type SpawnedItem = {
  id: string;
  emoji: string;
  type: ItemType;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  spawnTime: number; // timestamp
  lifetime: number; // milliseconds
  size: number; // scale factor
  velocity?: { x: number; y: number }; // optional movement
};

export type GameRule = {
  id: string;
  name: string;
  description: string;
  difficulty: number; // 1-5
  signalPattern: (emoji: string, context: RuleContext) => boolean;
  noisePattern?: (emoji: string, context: RuleContext) => boolean;
};

export type RuleContext = {
  round: number;
  score: number;
  itemsSpawned: number;
  signalCount: number;
  noiseCount: number;
  combo: number;
};

export type DifficultyLevel = {
  level: number;
  name: string;
  spawnRate: number; // items per second
  maxItemsOnScreen: number;
  itemLifetime: number; // milliseconds
  signalRatio: number; // 0-1, probability of signal vs noise
  noiseMultiplier: number; // how much more noise than signal
  speedMultiplier: number; // movement speed
  availableRules: string[]; // rule IDs
};

export type GameState = {
  isPlaying: boolean;
  isPaused: boolean;
  round: number;
  score: number;
  lives: number;
  combo: number;
  maxCombo: number;
  items: SpawnedItem[];
  activeRule: GameRule | null;
  difficulty: DifficultyLevel;
  startTime: number;
  elapsedTime: number;
  itemsClicked: number;
  signalsHit: number;
  noiseHit: number;
  isGameOver: boolean;
  showResultModal: boolean;
  masteryLevel: number; // 0-100
};

export type GameStats = {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  bestCombo: number;
  totalSignalsHit: number;
  totalNoiseHit: number;
  averageAccuracy: number;
  masteryLevel: number;
  highestRound: number;
};
