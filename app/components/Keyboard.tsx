"use client";

import { useCallback, useMemo } from "react";
import { useGameStore } from "../store/gameStore";
import type { CellState } from "../types/game";

const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const stateColors: Record<CellState, string> = {
  empty: "bg-gray-700 hover:bg-gray-600",
  correct: "bg-green-600 hover:bg-green-500",
  present: "bg-orange-500 hover:bg-orange-400",
  absent: "bg-gray-600 hover:bg-gray-500",
};

export default function Keyboard() {
  const { addLetter, removeLetter, submitGuess, keyboardState, isGameOver } =
    useGameStore();

  const handleKeyClick = useCallback(
    (key: string) => {
      if (isGameOver) return;

      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACKSPACE") {
        removeLetter();
      } else {
        addLetter(key);
      }
    },
    [isGameOver, addLetter, removeLetter, submitGuess]
  );

  const getKeyState = useCallback(
    (key: string): CellState => {
      return keyboardState[key] || "empty";
    },
    [keyboardState]
  );

  const keyboardRows = useMemo(
    () =>
      KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 flex-wrap justify-center">
          {row.map((key) => {
            const state = getKeyState(key);
            const isSpecial = key === "ENTER" || key === "BACKSPACE";
            const baseClasses =
              "px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-bold text-white rounded transition-colors min-w-[32px] sm:min-w-[40px] flex items-center justify-center";
            const stateClass = isSpecial
              ? "bg-gray-700 hover:bg-gray-600"
              : stateColors[state];

            return (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                disabled={isGameOver}
                className={`${baseClasses} ${stateClass} ${
                  isGameOver
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer active:scale-95"
                }`}
              >
                {key === "BACKSPACE" ? "⌫" : key === "ENTER" ? "ENTER" : key}
              </button>
            );
          })}
        </div>
      )),
    [getKeyState, handleKeyClick, isGameOver]
  );

  return (
    <div className="flex flex-col gap-2 items-center mt-6 sm:mt-8 max-w-full px-2">
      {keyboardRows}
    </div>
  );
}
