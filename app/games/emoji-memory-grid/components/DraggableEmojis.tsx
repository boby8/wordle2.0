"use client";

import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

export default function DraggableEmojis() {
  const { shuffledEmojis, isShowing, userPlacedEmojis } = useGameStore();

  const handleDragStart = (e: React.DragEvent, emoji: string) => {
    e.dataTransfer.setData("emoji", emoji);
    e.dataTransfer.effectAllowed = "move";
  };

  const getEmojiCount = (emoji: string) => {
    let count = 0;
    for (const value of userPlacedEmojis.values()) {
      if (value.emoji === emoji) {
        count++;
      }
    }
    return count;
  };

  if (isShowing) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
        Drag emojis to fill the grid
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {shuffledEmojis.map((emoji, index) => {
          const usedCount = getEmojiCount(emoji);
          const totalNeeded = shuffledEmojis.filter((e) => e === emoji).length;
          const isUsed = usedCount >= totalNeeded;

          return (
            <motion.div
              key={`${emoji}-${index}`}
              whileHover={!isUsed ? { scale: 1.1 } : {}}
              whileTap={!isUsed ? { scale: 0.9 } : {}}
              className={`
                text-4xl sm:text-5xl p-3 rounded-xl shadow-md
                cursor-${isUsed ? "not-allowed" : "grab"}
                transition-all duration-200
                ${
                  isUsed
                    ? "opacity-30 bg-gray-100 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-800 hover:shadow-lg active:cursor-grabbing"
                }
              `}
            >
              <div
                draggable={!isUsed}
                onDragStart={(e: React.DragEvent) => handleDragStart(e, emoji)}
                className="select-none"
              >
                {emoji}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
