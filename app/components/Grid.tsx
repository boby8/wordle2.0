"use client";

import Row from "./Row";
import { useGameStore } from "../store/gameStore";
import { calculateGridDimensions } from "../lib/gameLogic";

export default function Grid() {
  const { puzzle, attempts, currentGuess, currentRow, isGameOver } =
    useGameStore();

  if (!puzzle) return null;

  const { width } = calculateGridDimensions(
    puzzle.requiredLength,
    attempts,
    currentGuess
  );

  const rows = [];
  const totalRows = puzzle.maxAttempts;

  for (let i = 0; i < totalRows; i++) {
    const attempt = attempts[i];
    const isActive = i === currentRow && !isGameOver;
    const guess = isActive ? currentGuess : attempt?.guess || "";

    rows.push(
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

  return <div className="flex flex-col gap-2 items-center">{rows}</div>;
}
