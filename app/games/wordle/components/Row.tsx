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
  rowIndex: number;
  shouldShake?: boolean;
}

const Row = memo(function Row({
  guess,
  result,
  isActive = false,
  requiredLength,
  gridWidth,
  rowIndex,
  shouldShake = false,
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
          cellIndex={i}
        />
      );
    }
    return cellsArray;
  }, [guess, result, isActive, requiredLength, gridWidth]);

  return (
    <div className="flex gap-1 justify-center">
      <div
        className={`flex gap-1 ${
          shouldShake ? "animate-[rowShake_0.5s_ease-in-out]" : ""
        }`}
      >
        {cells}
      </div>
    </div>
  );
});

export default Row;
