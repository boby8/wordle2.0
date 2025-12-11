"use client";

import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { MAX_LEVEL, getRank } from "../lib/constants";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResultModal({ isOpen, onClose }: ResultModalProps) {
  const {
    accuracy,
    rank,
    score,
    level,
    elapsedTime,
    isGameOver,
    nextLevel,
    retryLevel,
    resetGame,
  } = useGameStore();

  const canProceed = accuracy >= 70;
  const isMaxLevel = level >= MAX_LEVEL;

  if (!isOpen) return null;

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S":
        return "text-purple-600 dark:text-purple-400";
      case "A":
        return "text-green-600 dark:text-green-400";
      case "B":
        return "text-blue-600 dark:text-blue-400";
      case "C":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
      >
        <div className="text-center space-y-4">
          {/* Rank Display */}
          <div className="text-6xl mb-2">
            {isGameOver ? "🎉" : canProceed ? "✅" : "❌"}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {isGameOver
              ? "Game Complete!"
              : canProceed
              ? "Level Complete!"
              : "Try Again"}
          </h2>

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Accuracy:
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {accuracy}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Rank:</span>
              <span className={`font-bold text-2xl ${getRankColor(rank)}`}>
                {rank}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Score:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {score}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Time:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {elapsedTime.toFixed(1)}s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Level:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {level}/{MAX_LEVEL}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {canProceed && !isMaxLevel && (
              <button
                onClick={() => {
                  nextLevel();
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
              >
                Next Level
              </button>
            )}
            {!canProceed && (
              <button
                onClick={() => {
                  retryLevel();
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
              >
                Retry Level
              </button>
            )}
            <button
              onClick={() => {
                resetGame();
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
            >
              {isGameOver ? "New Game" : "Exit"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
