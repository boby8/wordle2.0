"use client";

import { useGameStore } from "../store/gameStore";
import { loadStats } from "../lib/storage";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
}

export default function ResultModal({
  isOpen,
  onClose,
  onPlayAgain,
}: ResultModalProps) {
  const {
    score,
    round,
    maxCombo,
    signalsHit,
    noiseHit,
    masteryLevel,
  } = useGameStore();

  if (!isOpen) return null;

  const stats = loadStats();
  const accuracy = signalsHit + noiseHit > 0
    ? Math.round((signalsHit / (signalsHit + noiseHit)) * 100)
    : 0;

  const handlePlayAgain = () => {
    onPlayAgain();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Game Over
        </h2>

        <div className="space-y-4 mb-6">
          {/* Final Score */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Final Score
            </div>
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {score}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Round
              </div>
              <div className="text-2xl font-bold">{round}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Accuracy
              </div>
              <div className="text-2xl font-bold">{accuracy}%</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Max Combo
              </div>
              <div className="text-2xl font-bold">🔥 {maxCombo}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Mastery
              </div>
              <div className="text-2xl font-bold">{masteryLevel}%</div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Performance
            </div>
            <div className="flex justify-between text-sm">
              <span>Signals Hit: <strong className="text-green-600">{signalsHit}</strong></span>
              <span>Noise Hit: <strong className="text-red-600">{noiseHit}</strong></span>
            </div>
          </div>

          {/* Best Stats */}
          {stats.bestScore > 0 && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                Personal Best
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div>Best Score: <strong>{stats.bestScore}</strong></div>
                <div>Best Combo: <strong>🔥 {stats.bestCombo}</strong></div>
                <div>Highest Round: <strong>{stats.highestRound}</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePlayAgain}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

