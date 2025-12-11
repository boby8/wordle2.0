"use client";

import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import type { GridCell } from "../types/game";

interface GameBoardProps {
  config: { rows: number; cols: number };
}

export default function GameBoard({ config }: GameBoardProps) {
  const { grid, isShowing, placeEmoji, removeEmoji } = useGameStore();

  const handleCellClick = (cell: GridCell) => {
    if (isShowing) return; // Can't interact during show time

    if (cell.emoji) {
      // Remove emoji if clicked
      removeEmoji(cell.row, cell.col);
    }
  };

  const handleCellDrop = (e: React.DragEvent, cell: GridCell) => {
    e.preventDefault();
    if (isShowing) return;

    const emoji = e.dataTransfer.getData("emoji");
    if (emoji) {
      placeEmoji(cell.row, cell.col, emoji);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="grid gap-2 sm:gap-3 w-full max-w-2xl mx-auto"
      style={{
        gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isEmpty = cell.correctEmoji === "";
          const hasEmoji = cell.emoji !== null;
          const showCorrect = isShowing && !isEmpty;

          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(cell)}
              onDrop={(e) => handleCellDrop(e, cell)}
              onDragOver={handleDragOver}
              initial={false}
              animate={
                cell.isCorrect === false
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className={`
                aspect-square rounded-xl shadow-md
                flex items-center justify-center
                text-4xl sm:text-5xl
                transition-all duration-200
                ${
                  isEmpty
                    ? "bg-transparent"
                    : showCorrect
                    ? "bg-white dark:bg-gray-800"
                    : hasEmoji
                    ? cell.isCorrect === true
                      ? "bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500"
                      : cell.isCorrect === false
                      ? "bg-red-100 dark:bg-red-900/30 ring-2 ring-red-500"
                      : "bg-white dark:bg-gray-800"
                    : "bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              {showCorrect || hasEmoji ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {cell.emoji}
                </motion.div>
              ) : (
                <div className="text-gray-400 dark:text-gray-600 text-2xl">
                  {isEmpty ? "" : "?"}
                </div>
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
}
