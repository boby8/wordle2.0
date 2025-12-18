"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../store/gameStore";
import BackButton from "../../../shared/components/BackButton";
import GameCanvas from "./GameCanvas";
import RuleBanner from "./RuleBanner";
import GameStats from "./GameStats";
import ResultModal from "./ResultModal";
import HowToPlayModal from "./HowToPlayModal";

export default function GameController() {
  const {
    isPlaying,
    isPaused,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    updateItems,
    spawnNewItem,
    difficulty,
    isGameOver,
    showResultModal,
  } = useGameStore();

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  // Spawn items at regular intervals
  useEffect(() => {
    if (!isPlaying || isPaused || isGameOver) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
      return;
    }

    const spawnRate = difficulty.spawnRate * 1000; // Convert to ms
    spawnIntervalRef.current = setInterval(() => {
      spawnNewItem();
    }, spawnRate);

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [isPlaying, isPaused, isGameOver, difficulty.spawnRate, spawnNewItem]);

  // Update items position and remove expired (RAF loop for smooth animation)
  useEffect(() => {
    if (!isPlaying || isPaused || isGameOver) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const update = () => {
      updateItems();
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, isPaused, isGameOver, updateItems]);

  const handleStart = () => {
    startGame();
  };

  const handlePause = () => {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Back Button */}
      <div className="fixed top-4 left-0 sm:top-6 sm:left-0 z-50 pl-2 sm:pl-4">
        <BackButton />
      </div>

      <div className="flex flex-col items-center w-full p-4 sm:p-6 pt-16 sm:pt-20">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎯 Signal vs Noise
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Focus on the signal, ignore the noise
          </p>
        </div>

        {/* How to Play Button */}
        <div className="mb-4">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm font-medium"
          >
            ❓ How to Play
          </button>
        </div>

        {/* Game Stats */}
        <GameStats />

        {/* Rule Banner */}
        {isPlaying && <RuleBanner />}

        {/* Game Canvas */}
        <div className="w-full max-w-6xl h-[60vh] min-h-[400px] relative mt-4 sm:mt-6">
          {!isPlaying ? (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={handleStart}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Game
              </button>
            </div>
          ) : (
            <>
              <GameCanvas />
              {/* Pause Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handlePause}
                  className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors font-medium"
                >
                  {isPaused ? "▶️ Resume" : "⏸️ Pause"}
                </button>
              </div>
              {/* Pause Overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4">Paused</h2>
                    <button
                      onClick={handlePause}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Resume Game
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResultModal}
        onClose={() => {}}
        onPlayAgain={handlePlayAgain}
      />

      {/* How to Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}
