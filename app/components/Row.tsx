"use client";

import { memo, useMemo } from "react";
import Cell from "./Cell";
import type { CellState } from "../types/game";

interface RowProps {
  guess: string;
  result?: CellState[];
  isActive?: boolean;
  requiredLength: number;
  gridWidth: number;
}

const Row = memo(function Row({
  guess,
  result,
  isActive = false,
  requiredLength,
  gridWidth,
}: RowProps) {
  const cells = useMemo(() => {
    const cellsArray = [];
    for (let i = 0; i < gridWidth; i++) {
      const letter = guess[i];
      const state: CellState = result?.[i] || "empty";
      const isHighlighted = i < requiredLength;
      const isShadowed = i >= requiredLength;
      const isActiveCell = isActive && i === guess.length;

      cellsArray.push(
        <Cell
          key={i}
          letter={letter}
          state={state}
          isActive={isActiveCell}
          isHighlighted={isHighlighted}
          isShadowed={isShadowed}
        />
      );
    }
    return cellsArray;
  }, [guess, result, isActive, requiredLength, gridWidth]);

  return <div className="flex gap-1">{cells}</div>;
});

export default Row;
