"use client";

import { useGameStore } from "../store/gameStore";
import type { Category, GameMode } from "../types/game";

const gameModes: { value: GameMode; label: string; emoji: string }[] = [
  { value: "movies", label: "Movies", emoji: "🎬" },
  { value: "songs", label: "Songs", emoji: "🎵" },
];

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: "bollywood", label: "Bollywood", emoji: "🎬" },
  { value: "hollywood", label: "Hollywood", emoji: "🎥" },
];

export default function CategorySelector() {
  const { gameMode, selectedCategory, setGameMode, setCategory } =
    useGameStore();

  return (
    <div className="space-y-4 mb-6">
      {/* Game Mode Selector */}
      <div className="flex gap-3 justify-center">
        {gameModes.map((mode) => {
          const isActive = gameMode === mode.value;
          return (
            <button
              key={mode.value}
              onClick={() => setGameMode(mode.value)}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              <span className="text-xl mr-2">{mode.emoji}</span>
              {mode.label}
            </button>
          );
        })}
      </div>

      {/* Category Selector */}
      <div className="flex gap-3 justify-center">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              <span className="text-xl mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
