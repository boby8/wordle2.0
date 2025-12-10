"use client";

import { useGameStore } from "../store/gameStore";
import { formatTime } from "../lib/gameLogic";

export default function GameStats() {
  const { moves, elapsedTime, bestScore, difficulty } = useGameStore();

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6">
      <div className="text-center">
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
          Moves
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
          {moves}
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
          Time
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
          {formatTime(elapsedTime)}
        </div>
      </div>
      {bestScore && (
        <div className="text-center">
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
            Best
          </div>
          <div className="text-lg sm:text-xl font-semibold text-purple-600 dark:text-purple-400">
            {formatTime(bestScore.time)} / {bestScore.moves}
          </div>
        </div>
      )}
    </div>
  );
}
