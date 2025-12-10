"use client";

import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import CategorySelector from "./CategorySelector";
import MovieCard from "./MovieCard";

export default function GameController() {
  const { setCategory, selectedCategory, currentItem } = useGameStore();

  useEffect(() => {
    // Initialize with first item if not already set
    if (!currentItem) {
      setCategory(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎬 Movie & Song Charades
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Guess movies and songs from emojis!
          </p>
        </div>

        {/* Category Selector */}
        <CategorySelector />

        {/* Game Card */}
        <MovieCard />
      </div>
    </div>
  );
}
