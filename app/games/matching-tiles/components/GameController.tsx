"use client";

import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import Grid from "./Grid";
import GameStats from "./GameStats";
import GameModal from "./GameModal";
import DifficultySelector from "./DifficultySelector";
import BackButton from "../../../shared/components/BackButton";

export default function GameController() {
  const {
    initializeGame,
    resetGame,
    tickTimer,
    isGameComplete,
    timerRunning,
    difficulty,
  } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    initializeGame(difficulty);
  }, []);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickTimer]);

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleChangeDifficulty = () => {
    // Reset and show difficulty selector (handled by DifficultySelector component)
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      {/* Back Button - Fixed to viewport extreme left */}
      <div className="fixed top-4 left-0 sm:top-6 sm:left-0 z-50 pl-2 sm:pl-4">
        <BackButton />
      </div>
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 pt-12 sm:pt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🧠 Memory Match
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Match the emoji pairs!
          </p>
        </div>

        {/* Difficulty Selector */}
        <DifficultySelector />

        {/* Game Stats */}
        <GameStats />

        {/* Game Grid */}
        <Grid />

        {/* Game Complete Modal */}
        <GameModal
          isOpen={isGameComplete}
          onClose={() => {}}
          onPlayAgain={handlePlayAgain}
          onChangeDifficulty={handleChangeDifficulty}
        />
      </div>
    </div>
  );
}
