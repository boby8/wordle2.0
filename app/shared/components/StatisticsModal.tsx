"use client";

import { GameStats, getStats, resetStats } from "@/app/games/wordle/lib/stats";
import { useEffect, useState } from "react";

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatisticsModal({
  isOpen,
  onClose,
}: StatisticsModalProps) {
  const [stats, setStats] = useState<GameStats>(getStats());

  useEffect(() => {
    if (isOpen) {
      // Defer state update to avoid sync setState warning
      setTimeout(() => {
        setStats(getStats());
      }, 0);
    }
  }, [isOpen]);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all statistics?")) {
      resetStats();
      setStats(getStats());
    }
  };

  if (!isOpen) return null;

  // Ensure guessDistribution exists and is valid
  const guessDistribution = stats.guessDistribution || [0, 0, 0, 0, 0, 0];
  const maxDistribution = Math.max(...guessDistribution, 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg)] rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative border border-[var(--tile-border)]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text)] hover:text-[var(--error)] transition-colors text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--text)] mb-6 text-center">
          Statistics
        </h2>

        {/* Key Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--text)]">
              {stats.gamesPlayed}
            </div>
            <div className="text-xs text-[var(--text)] opacity-70 mt-1">
              PLAYED
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--text)]">
              {stats.winPercentage}
            </div>
            <div className="text-xs text-[var(--text)] opacity-70 mt-1">
              WIN %
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--text)]">
              {stats.currentStreak}
            </div>
            <div className="text-xs text-[var(--text)] opacity-70 mt-1">
              CURRENT STREAK
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--text)]">
              {stats.bestStreak}
            </div>
            <div className="text-xs text-[var(--text)] opacity-70 mt-1">
              MAX STREAK
            </div>
          </div>
        </div>

        {/* Guess Distribution */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-3 text-center">
            Guess Distribution
          </h3>
          <div className="space-y-2">
            {guessDistribution.map((count: number, index: number) => {
              const attemptNumber = index + 1;
              const percentage =
                maxDistribution > 0 ? (count / maxDistribution) * 100 : 0;

              return (
                <div key={attemptNumber} className="flex items-center gap-2">
                  <div className="w-6 text-sm font-semibold text-[var(--text)]">
                    {attemptNumber}
                  </div>
                  <div className="flex-1 relative h-6 bg-[var(--tile-empty)] rounded overflow-hidden">
                    <div
                      className="h-full bg-[var(--correct)] flex items-center justify-end pr-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    >
                      {count > 0 && (
                        <span className="text-xs font-semibold text-white">
                          {count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[var(--tile-empty)] hover:bg-[var(--keyboard-bg)] text-[var(--text)] rounded font-semibold transition-colors border border-[var(--tile-border)]"
          >
            RESET STATISTICS
          </button>
        </div>
      </div>
    </div>
  );
}
