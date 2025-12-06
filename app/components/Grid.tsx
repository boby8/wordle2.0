"use client";

import { useMemo } from "react";
import Row from "./Row";
import { useGameStore } from "../store/gameStore";
import { calculateGridDimensions } from "../lib/gameLogic";

export default function Grid() {
  const puzzle = useGameStore((state) => state.puzzle);
  const attempts = useGameStore((state) => state.attempts);
  const currentGuess = useGameStore((state) => state.currentGuess);
  const currentRow = useGameStore((state) => state.currentRow);
  const isGameOver = useGameStore((state) => state.isGameOver);

  const { width } = useMemo(
    () =>
      calculateGridDimensions(
        puzzle?.requiredLength || 0,
        attempts,
        currentGuess
      ),
    [puzzle?.requiredLength, attempts, currentGuess]
  );

  const rows = useMemo(() => {
    if (!puzzle) return [];

    const totalRows = puzzle.maxAttempts;
    const rowsArray = [];

    for (let i = 0; i < totalRows; i++) {
      const attempt = attempts[i];
      const isActive = i === currentRow && !isGameOver;
      const guess = isActive ? currentGuess : attempt?.guess || "";

      rowsArray.push(
        <Row
          key={i}
          guess={guess}
          result={attempt?.result}
          isActive={isActive}
          requiredLength={puzzle.requiredLength}
          gridWidth={width}
        />
      );
    }

    return rowsArray;
  }, [puzzle, attempts, currentGuess, currentRow, isGameOver, width]);

  if (!puzzle) return null;

  return <div className="flex flex-col gap-2 items-center">{rows}</div>;
}
