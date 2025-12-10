"use client";

import { useGameStore } from "../store/gameStore";
import { formatTime } from "../lib/gameLogic";
import { DIFFICULTY_CONFIGS } from "../lib/constants";
import type { Difficulty } from "../types/game";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

export default function GameModal({
  isOpen,
  onClose,
  onPlayAgain,
  onChangeDifficulty,
}: GameModalProps) {
  const { moves, elapsedTime, bestScore, difficulty } = useGameStore();

  if (!isOpen) return null;

  const config = DIFFICULTY_CONFIGS[difficulty];
  const isNewBest =
    bestScore &&
    (elapsedTime < bestScore.time ||
      (elapsedTime === bestScore.time && moves < bestScore.moves));

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            You Won!
          </h2>
          {isNewBest && (
            <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-4">
              🏆 New Best Score!
            </p>
          )}
          <div className="space-y-3 mb-6">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Time: </span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {formatTime(elapsedTime)}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Moves: </span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {moves}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              Difficulty:{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} (
              {config.totalPairs} pairs)
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onPlayAgain}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Play Again
            </button>
            <button
              onClick={onChangeDifficulty}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
            >
              Change Difficulty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
