import type {
  SpawnedItem,
  GameRule,
  RuleContext,
  DifficultyLevel,
} from "../types/game";
import {
  SIGNAL_EMOJIS,
  NOISE_EMOJIS,
  GAME_RULES,
  DIFFICULTY_LEVELS,
} from "./constants";

// Generate a random item based on current rule and difficulty
export function spawnItem(
  rule: GameRule | null,
  difficulty: DifficultyLevel,
  context: RuleContext
): SpawnedItem {
  const id = `item-${Date.now()}-${Math.random()}`;
  const x = Math.random() * 80 + 10; // 10-90% to avoid edges
  const y = Math.random() * 80 + 10;
  const spawnTime = Date.now();

  // Determine if this should be signal or noise
  const isSignal = Math.random() < difficulty.signalRatio;

  let emoji: string;
  let type: "signal" | "noise";

  if (rule) {
    // Use rule to determine signal/noise
    const allEmojis = [...SIGNAL_EMOJIS, ...NOISE_EMOJIS];
    const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);

    if (isSignal) {
      // Find a signal emoji that matches the rule
      const signalEmoji = shuffled.find((e) => rule.signalPattern(e, context));
      emoji =
        signalEmoji ||
        SIGNAL_EMOJIS[Math.floor(Math.random() * SIGNAL_EMOJIS.length)];
      type = "signal";
    } else {
      // Find a noise emoji (either doesn't match signal pattern, or matches noise pattern)
      const noiseEmoji = shuffled.find((e) => {
        if (rule.noisePattern) {
          return rule.noisePattern(e, context);
        }
        return !rule.signalPattern(e, context);
      });
      emoji =
        noiseEmoji ||
        NOISE_EMOJIS[Math.floor(Math.random() * NOISE_EMOJIS.length)];
      type = "noise";
    }
  } else {
    // No rule active, random selection
    if (isSignal) {
      emoji = SIGNAL_EMOJIS[Math.floor(Math.random() * SIGNAL_EMOJIS.length)];
      type = "signal";
    } else {
      emoji = NOISE_EMOJIS[Math.floor(Math.random() * NOISE_EMOJIS.length)];
      type = "noise";
    }
  }

  // Size variation (1.0x to 1.3x) - larger base size for better clickability
  const size = 1.0 + Math.random() * 0.3;

  // Optional velocity for moving items (higher difficulty)
  const velocity =
    difficulty.speedMultiplier > 1.0
      ? {
          x: (Math.random() - 0.5) * 0.5 * difficulty.speedMultiplier,
          y: (Math.random() - 0.5) * 0.5 * difficulty.speedMultiplier,
        }
      : undefined;

  return {
    id,
    emoji,
    type,
    x,
    y,
    spawnTime,
    lifetime: difficulty.itemLifetime,
    size,
    velocity,
  };
}

// Check if item should be removed (expired)
export function isItemExpired(item: SpawnedItem): boolean {
  return Date.now() - item.spawnTime > item.lifetime;
}

// Update item position if it has velocity
export function updateItemPosition(item: SpawnedItem): SpawnedItem {
  if (!item.velocity) return item;

  let newX = item.x + item.velocity.x;
  let newY = item.y + item.velocity.y;

  // Bounce off edges
  if (newX < 5 || newX > 95) {
    item.velocity.x *= -1;
    newX = Math.max(5, Math.min(95, newX));
  }
  if (newY < 5 || newY > 95) {
    item.velocity.y *= -1;
    newY = Math.max(5, Math.min(95, newY));
  }

  return {
    ...item,
    x: newX,
    y: newY,
    velocity: item.velocity,
  };
}

// Get rule by ID
export function getRuleById(ruleId: string): GameRule | null {
  return GAME_RULES.find((r) => r.id === ruleId) || null;
}

// Select a random rule based on difficulty
export function selectRandomRule(difficulty: DifficultyLevel): GameRule {
  const availableRules = GAME_RULES.filter((r) =>
    difficulty.availableRules.includes(r.id)
  );

  if (availableRules.length === 0) {
    // Fallback to first rule
    return GAME_RULES[0];
  }

  return availableRules[Math.floor(Math.random() * availableRules.length)];
}

// Check if clicked item matches the rule (is signal)
export function isSignalItem(
  item: SpawnedItem,
  rule: GameRule | null,
  context: RuleContext
): boolean {
  if (!rule) {
    return item.type === "signal";
  }

  return rule.signalPattern(item.emoji, context);
}

// Calculate accuracy percentage
export function calculateAccuracy(
  signalsHit: number,
  noiseHit: number
): number {
  const total = signalsHit + noiseHit;
  if (total === 0) return 0;
  return Math.round((signalsHit / total) * 100);
}

// Get next difficulty level (progressive scaling)
export function getNextDifficulty(
  currentLevel: number
): DifficultyLevel | null {
  const nextLevel = DIFFICULTY_LEVELS.find((l) => l.level === currentLevel + 1);
  return nextLevel || null;
}

// Check if player should advance to next round
export function shouldAdvanceRound(
  score: number,
  currentRound: number,
  accuracy: number
): boolean {
  // Advance if score threshold met and accuracy is good
  const scoreThreshold = currentRound * 50;
  return score >= scoreThreshold && accuracy >= 70;
}
