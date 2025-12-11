"use client";

import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { LEVEL_CONFIGS } from "../lib/constants";
import GameBoard from "./GameBoard";
import DraggableEmojis from "./DraggableEmojis";
import ResultModal from "./ResultModal";
import BackButton from "../../../shared/components/BackButton";

export default function EmojiMemoryGridGame() {
  const {
    level,
    score,
    isShowing,
    showResultModal,
    startGame,
    startRound,
    updateElapsedTime,
    startTime,
  } = useGameStore();

  const config = LEVEL_CONFIGS[level] || LEVEL_CONFIGS[5];

  // Initialize game on mount
  useEffect(() => {
    startGame();
    startRound();
  }, []);

  // Timer for elapsed time
  useEffect(() => {
    if (isShowing || showResultModal) return;

    const interval = setInterval(() => {
      if (startTime > 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        updateElapsedTime(elapsed);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isShowing, showResultModal, startTime, updateElapsedTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      {/* Back Button */}
      <div className="fixed top-4 left-0 sm:top-6 sm:left-0 z-50 pl-2 sm:pl-4">
        <BackButton />
      </div>

      <div className="flex flex-col items-center w-full space-y-6 pt-12 sm:pt-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🧠 Emoji Memory Grid
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Memorize the emojis, then place them correctly!
          </p>
        </div>

        {/* HUD - Level & Score */}
        <div className="flex gap-4 items-center">
          <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Level
            </div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {level}
            </div>
          </div>
          <div className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Score
            </div>
            <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">
              {score}
            </div>
          </div>
        </div>

        {/* Show Time Indicator */}
        {isShowing && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              👀 Memorize the emojis...
            </p>
          </div>
        )}

        {/* Game Board */}
        <GameBoard config={config} />

        {/* Draggable Emojis */}
        <DraggableEmojis />

        {/* Result Modal */}
        <ResultModal isOpen={showResultModal} onClose={() => {}} />
      </div>
    </div>
  );
}
