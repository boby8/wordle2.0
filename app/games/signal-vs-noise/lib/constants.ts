import type { GameRule, DifficultyLevel } from "../types/game";

// Emoji pools for signal and noise
export const SIGNAL_EMOJIS = [
  "⭐",
  "🌟",
  "✨",
  "💫",
  "🔆",
  "💡",
  "🎯",
  "✅",
  "🎖️",
  "🏆",
  "💎",
  "🔔",
  "🎪",
  "🎨",
  "🎭",
  "🎬",
  "🎤",
  "🎧",
  "🎵",
  "🎶",
];

export const NOISE_EMOJIS = [
  "❌",
  "⚠️",
  "🚫",
  "⛔",
  "🔴",
  "🟠",
  "🟡",
  "🟢",
  "🔵",
  "🟣",
  "⚫",
  "⚪",
  "🟤",
  "💭",
  "💬",
  "🗯️",
  "💢",
  "💥",
  "🔥",
  "💨",
  "🌪️",
  "🌊",
  "☄️",
  "🌠",
  "🌌",
  "🌍",
  "🌎",
  "🌏",
  "🌑",
  "🌒",
];

export const ALL_EMOJIS = [...SIGNAL_EMOJIS, ...NOISE_EMOJIS];

// Game Rules - Data-driven, scalable rule engine
export const GAME_RULES: GameRule[] = [
  {
    id: "stars-only",
    name: "Stars Only",
    description: "Click only ⭐ and 🌟",
    difficulty: 1,
    signalPattern: (emoji) => emoji === "⭐" || emoji === "🌟",
  },
  {
    id: "sparkles-only",
    name: "Sparkles Only",
    description: "Click ✨ and 💫 only",
    difficulty: 1,
    signalPattern: (emoji) => emoji === "✨" || emoji === "💫",
  },
  {
    id: "light-sources",
    name: "Light Sources",
    description: "Click all light emojis (⭐✨💡🔆)",
    difficulty: 2,
    signalPattern: (emoji) =>
      ["⭐", "✨", "💡", "🔆", "🌟", "💫"].includes(emoji),
  },
  {
    id: "awards-only",
    name: "Awards Only",
    description: "Click 🎯✅🎖️🏆",
    difficulty: 2,
    signalPattern: (emoji) => ["🎯", "✅", "🎖️", "🏆"].includes(emoji),
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Click 🎪🎨🎭🎬🎤",
    difficulty: 2,
    signalPattern: (emoji) => ["🎪", "🎨", "🎭", "🎬", "🎤"].includes(emoji),
  },
  {
    id: "music-only",
    name: "Music Only",
    description: "Click 🎧🎵🎶",
    difficulty: 2,
    signalPattern: (emoji) => ["🎧", "🎵", "🎶"].includes(emoji),
  },
  {
    id: "gems-and-bells",
    name: "Gems & Bells",
    description: "Click 💎 and 🔔",
    difficulty: 2,
    signalPattern: (emoji) => emoji === "💎" || emoji === "🔔",
  },
  {
    id: "no-red",
    name: "Avoid Red",
    description: "Click everything EXCEPT 🔴 and ❌",
    difficulty: 3,
    signalPattern: (emoji) => emoji !== "🔴" && emoji !== "❌",
    noisePattern: (emoji) => emoji === "🔴" || emoji === "❌",
  },
  {
    id: "only-yellow-green",
    name: "Yellow & Green Only",
    description: "Click 🟡 and 🟢 only",
    difficulty: 3,
    signalPattern: (emoji) => emoji === "🟡" || emoji === "🟢",
  },
  {
    id: "avoid-warning",
    name: "Avoid Warnings",
    description: "Click all except ⚠️🚫⛔",
    difficulty: 3,
    signalPattern: (emoji) => !["⚠️", "🚫", "⛔"].includes(emoji),
    noisePattern: (emoji) => ["⚠️", "🚫", "⛔"].includes(emoji),
  },
  {
    id: "positive-only",
    name: "Positive Vibes",
    description: "Click ⭐✨✅🎯🏆💎 (avoid ❌⚠️🚫)",
    difficulty: 3,
    signalPattern: (emoji) =>
      ["⭐", "✨", "✅", "🎯", "🏆", "💎", "🌟", "💫", "🎖️"].includes(emoji),
    noisePattern: (emoji) => ["❌", "⚠️", "🚫", "⛔"].includes(emoji),
  },
  {
    id: "round-conditional",
    name: "Round-Based",
    description: "Even rounds: stars, Odd rounds: sparkles",
    difficulty: 4,
    signalPattern: (emoji, context) => {
      if (context.round % 2 === 0) {
        return emoji === "⭐" || emoji === "🌟";
      }
      return emoji === "✨" || emoji === "💫";
    },
  },
  {
    id: "score-conditional",
    name: "Score-Based",
    description: "Score < 50: stars, Score >= 50: awards",
    difficulty: 4,
    signalPattern: (emoji, context) => {
      if (context.score < 50) {
        return emoji === "⭐" || emoji === "🌟";
      }
      return ["🎯", "✅", "🎖️", "🏆"].includes(emoji);
    },
  },
  {
    id: "combo-conditional",
    name: "Combo-Based",
    description: "Combo < 3: light, Combo >= 3: music",
    difficulty: 4,
    signalPattern: (emoji, context) => {
      if (context.combo < 3) {
        return ["⭐", "✨", "💡", "🔆"].includes(emoji);
      }
      return ["🎧", "🎵", "🎶"].includes(emoji);
    },
  },
  {
    id: "exclusive-pairs",
    name: "Exclusive Pairs",
    description: "Click ⭐ OR ✨, but not both types",
    difficulty: 5,
    signalPattern: (emoji) => emoji === "⭐" || emoji === "✨",
  },
  {
    id: "master-mode",
    name: "Master Mode",
    description: "Only ⭐✨💡🔆🎯✅ (avoid everything else)",
    difficulty: 5,
    signalPattern: (emoji) =>
      ["⭐", "✨", "💡", "🔆", "🎯", "✅", "🌟", "💫"].includes(emoji),
    noisePattern: (emoji) =>
      !["⭐", "✨", "💡", "🔆", "🎯", "✅", "🌟", "💫"].includes(emoji),
  },
];

// Difficulty Levels
export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    level: 1,
    name: "Beginner",
    spawnRate: 1.5,
    maxItemsOnScreen: 5,
    itemLifetime: 4000,
    signalRatio: 0.6,
    noiseMultiplier: 0.7,
    speedMultiplier: 0.5,
    availableRules: ["stars-only", "sparkles-only", "light-sources"],
  },
  {
    level: 2,
    name: "Easy",
    spawnRate: 2.0,
    maxItemsOnScreen: 8,
    itemLifetime: 3500,
    signalRatio: 0.5,
    noiseMultiplier: 1.0,
    speedMultiplier: 0.7,
    availableRules: [
      "stars-only",
      "sparkles-only",
      "light-sources",
      "awards-only",
      "entertainment",
    ],
  },
  {
    level: 3,
    name: "Medium",
    spawnRate: 2.5,
    maxItemsOnScreen: 12,
    itemLifetime: 3000,
    signalRatio: 0.4,
    noiseMultiplier: 1.5,
    speedMultiplier: 1.0,
    availableRules: [
      "light-sources",
      "awards-only",
      "entertainment",
      "music-only",
      "gems-and-bells",
      "no-red",
    ],
  },
  {
    level: 4,
    name: "Hard",
    spawnRate: 3.0,
    maxItemsOnScreen: 15,
    itemLifetime: 2500,
    signalRatio: 0.35,
    noiseMultiplier: 2.0,
    speedMultiplier: 1.3,
    availableRules: [
      "no-red",
      "avoid-warning",
      "positive-only",
      "round-conditional",
      "score-conditional",
    ],
  },
  {
    level: 5,
    name: "Expert",
    spawnRate: 3.5,
    maxItemsOnScreen: 20,
    itemLifetime: 2000,
    signalRatio: 0.3,
    noiseMultiplier: 2.5,
    speedMultiplier: 1.5,
    availableRules: [
      "round-conditional",
      "score-conditional",
      "combo-conditional",
      "exclusive-pairs",
      "master-mode",
    ],
  },
];

export const INITIAL_LIVES = 3;
export const COMBO_THRESHOLD = 3; // Combo bonus starts at 3
export const COMBO_MULTIPLIER = 1.5; // Score multiplier for combos
export const SIGNAL_SCORE = 10;
export const NOISE_PENALTY = -5;
export const COMBO_BONUS = 5;

// Scoring formula
export function calculateScore(
  signalsHit: number,
  noiseHit: number,
  combo: number,
  timeBonus: number
): number {
  let score = signalsHit * SIGNAL_SCORE;
  score += noiseHit * NOISE_PENALTY;

  if (combo >= COMBO_THRESHOLD) {
    score += combo * COMBO_BONUS * COMBO_MULTIPLIER;
  }

  score += timeBonus; // Faster = more bonus

  return Math.max(0, score);
}

// Mastery calculation (0-100)
export function calculateMastery(
  accuracy: number,
  roundsCompleted: number,
  bestCombo: number
): number {
  const accuracyScore = accuracy * 0.5; // 50% weight
  const roundsScore = Math.min(roundsCompleted * 2, 30); // 30% weight, max at 15 rounds
  const comboScore = Math.min(bestCombo * 2, 20); // 20% weight, max at 10 combo

  return Math.min(100, Math.round(accuracyScore + roundsScore + comboScore));
}
