import type { GameStats } from "../types/game";

const STORAGE_KEY = "signal-vs-noise-stats";

export function loadStats(): GameStats {
  if (typeof window === "undefined") {
    return getDefaultStats();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultStats();
    
    const parsed = JSON.parse(stored);
    return {
      ...getDefaultStats(),
      ...parsed,
    };
  } catch (error) {
    console.error("Failed to load stats:", error);
    return getDefaultStats();
  }
}

export function saveStats(stats: GameStats): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Failed to save stats:", error);
  }
}

export function updateStats(
  score: number,
  combo: number,
  signalsHit: number,
  noiseHit: number,
  round: number,
  accuracy: number,
  masteryLevel: number
): void {
  const current = loadStats();
  
  const newStats: GameStats = {
    totalGames: current.totalGames + 1,
    totalScore: current.totalScore + score,
    bestScore: Math.max(current.bestScore, score),
    bestCombo: Math.max(current.bestCombo, combo),
    totalSignalsHit: current.totalSignalsHit + signalsHit,
    totalNoiseHit: current.totalNoiseHit + noiseHit,
    averageAccuracy: calculateAverageAccuracy(
      current.averageAccuracy,
      current.totalGames,
      accuracy
    ),
    masteryLevel: Math.max(current.masteryLevel, masteryLevel),
    highestRound: Math.max(current.highestRound, round),
  };
  
  saveStats(newStats);
}

function calculateAverageAccuracy(
  currentAvg: number,
  totalGames: number,
  newAccuracy: number
): number {
  if (totalGames === 0) return newAccuracy;
  return Math.round((currentAvg * totalGames + newAccuracy) / (totalGames + 1));
}

function getDefaultStats(): GameStats {
  return {
    totalGames: 0,
    totalScore: 0,
    bestScore: 0,
    bestCombo: 0,
    totalSignalsHit: 0,
    totalNoiseHit: 0,
    averageAccuracy: 0,
    masteryLevel: 0,
    highestRound: 0,
  };
}

