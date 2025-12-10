"use client";

import { useGameStore } from "../store/gameStore";
import type { Difficulty } from "../types/game";
import { DIFFICULTY_CONFIGS } from "../lib/constants";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function DifficultySelector() {
  const { difficulty, setDifficulty, initializeGame } = useGameStore();

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    initializeGame(newDifficulty);
  };

  return (
    <div className="mb-6">
      <div className="text-center mb-3">
        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Difficulty:
        </span>
      </div>
      <div className="flex gap-2 sm:gap-3 justify-center">
        {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => {
          const config = DIFFICULTY_CONFIGS[diff];
          const isActive = difficulty === diff;
          return (
            <button
              key={diff}
              onClick={() => handleDifficultyChange(diff)}
              className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              <div className="text-sm sm:text-base">
                {DIFFICULTY_LABELS[diff]}
              </div>
              <div className="text-xs text-current/80">
                {config.totalPairs} pairs
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
