"use client";

import { useGameStore } from "../store/gameStore";

export default function GameStats() {
  const {
    score,
    lives,
    combo,
    maxCombo,
    round,
    signalsHit,
    noiseHit,
    elapsedTime,
    isPlaying,
  } = useGameStore();

  const accuracy = signalsHit + noiseHit > 0
    ? Math.round((signalsHit / (signalsHit + noiseHit)) * 100)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mb-4 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Score */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
            Score
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {score}
          </div>
        </div>

        {/* Lives */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
            Lives
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
            {"❤️".repeat(lives)}
          </div>
        </div>

        {/* Combo */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
            Combo
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
            {combo > 0 ? `🔥 ${combo}` : "—"}
          </div>
          {maxCombo > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              Best: {maxCombo}
            </div>
          )}
        </div>

        {/* Round / Accuracy */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
            {isPlaying ? "Accuracy" : "Round"}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
            {isPlaying ? `${accuracy}%` : round}
          </div>
          {isPlaying && (
            <div className="text-xs text-gray-500 mt-1">
              {signalsHit}✓ / {noiseHit}✗
            </div>
          )}
        </div>
      </div>

      {/* Time */}
      {isPlaying && (
        <div className="mt-3 text-center">
          <div className="inline-block px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Time:{" "}
            </span>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

