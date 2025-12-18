"use client";

import { useGameStore } from "../store/gameStore";
import SpawnedItem from "./SpawnedItem";

export default function GameCanvas() {
  const { items, clickItem } = useGameStore();

  return (
    <div className="relative w-full h-full bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl border-2 border-indigo-200 dark:border-gray-700 overflow-hidden">
      {items.map((item) => (
        <SpawnedItem
          key={item.id}
          item={item}
          onClick={() => clickItem(item.id)}
        />
      ))}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            Items will spawn here...
          </p>
        </div>
      )}
    </div>
  );
}

