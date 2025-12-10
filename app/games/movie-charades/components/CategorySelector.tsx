"use client";

import { useGameStore } from "../store/gameStore";
import type { Category } from "../types/game";

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: "bollywood", label: "Bollywood", emoji: "🎬" },
  { value: "hollywood", label: "Hollywood", emoji: "🎥" },
];

export default function CategorySelector() {
  const { selectedCategory, setCategory, resetGame } = useGameStore();

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
  };

  return (
    <div className="flex gap-3 justify-center mb-6">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
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
  );
}
