export interface GameStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  winPercentage: number;
  guessDistribution: number[]; // [wins in 1 attempt, wins in 2 attempts, ..., wins in 6 attempts]
}

const STATS_KEY = "wordable-stats";

export function getStats(): GameStats {
  if (typeof window === "undefined") {
    return getDefaultStats();
  }

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure guessDistribution exists for old stats
      if (
        !parsed.guessDistribution ||
        !Array.isArray(parsed.guessDistribution)
      ) {
        parsed.guessDistribution = [0, 0, 0, 0, 0, 0];
      }
      // Ensure it has exactly 6 elements
      if (parsed.guessDistribution.length !== 6) {
        parsed.guessDistribution = [
          ...parsed.guessDistribution.slice(0, 6),
          ...Array(6 - Math.min(parsed.guessDistribution.length, 6)).fill(0),
        ].slice(0, 6);
      }
      return parsed;
    }
  } catch (error) {
    console.error("Error loading stats:", error);
  }

  return getDefaultStats();
}

export function getDefaultStats(): GameStats {
  return {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    winPercentage: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0], // 6 attempts
  };
}

export function updateStats(
  hasWon: boolean,
  attemptNumber?: number
): GameStats {
  const stats = getStats();

  // Ensure guessDistribution exists and has 6 elements
  if (!stats.guessDistribution || stats.guessDistribution.length !== 6) {
    stats.guessDistribution = [0, 0, 0, 0, 0, 0];
  }

  stats.gamesPlayed += 1;

  if (hasWon) {
    stats.wins += 1;
    stats.currentStreak += 1;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }

    // Track which attempt number the win occurred on (1-6)
    if (attemptNumber && attemptNumber >= 1 && attemptNumber <= 6) {
      stats.guessDistribution[attemptNumber - 1] += 1;
    }
  } else {
    stats.losses += 1;
    stats.currentStreak = 0;
  }

  stats.winPercentage =
    stats.gamesPlayed > 0
      ? Math.round((stats.wins / stats.gamesPlayed) * 100)
      : 0;

  // Save to localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error("Error saving stats:", error);
    }
  }

  return stats;
}

export function resetStats(): GameStats {
  const defaultStats = getDefaultStats();
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
    } catch (error) {
      console.error("Error resetting stats:", error);
    }
  }
  return defaultStats;
}
