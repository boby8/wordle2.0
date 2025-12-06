"use client";

import Cell from "./Cell";
import type { CellState } from "../types/game";

interface RowProps {
  guess: string;
  result?: CellState[];
  isActive?: boolean;
  requiredLength: number;
  gridWidth: number;
}

export default function Row({
  guess,
  result,
  isActive = false,
  requiredLength,
  gridWidth,
}: RowProps) {
  const cells = Array.from({ length: gridWidth }, (_, i) => {
    const letter = guess[i];
    const state: CellState = result?.[i] || "empty";
    const isHighlighted = i < requiredLength;
    const isShadowed = i >= requiredLength;
    const isActiveCell = isActive && i === guess.length;

    return (
      <Cell
        key={i}
        letter={letter}
        state={state}
        isActive={isActiveCell}
        isHighlighted={isHighlighted}
        isShadowed={isShadowed}
      />
    );
  });

  return <div className="flex gap-1">{cells}</div>;
}
