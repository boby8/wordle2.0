"use client";

import { memo } from "react";
import type { CellState } from "../types/game";

interface CellProps {
  letter?: string;
  state: CellState;
  isActive?: boolean;
  isHighlighted?: boolean;
  isShadowed?: boolean;
}

const Cell = memo(function Cell({
  letter,
  state,
  isActive = false,
  isHighlighted = false,
  isShadowed = false,
}: CellProps) {
  const getStateStyles = (state: CellState): string => {
    switch (state) {
      case "correct":
        return "bg-[var(--correct)] border-[var(--correct-border)] text-white";
      case "present":
        return "bg-[var(--present)] border-[var(--present-border)] text-white";
      case "absent":
        return "bg-[var(--absent)] border-[var(--absent-border)] text-white";
      default:
        return "bg-[var(--tile-empty)] border-[var(--tile-empty-border)] text-[var(--tile-text)]";
    }
  };

  const baseClasses =
    "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold transition-all duration-200";
  const stateClass = getStateStyles(state);
  const activeClass = isActive
    ? "ring-2 ring-[var(--highlight)] ring-offset-2 ring-offset-[var(--bg)]"
    : "";

  const highlightClass =
    isHighlighted && state === "empty"
      ? "border-[var(--highlight)]/60 border-dashed"
      : "";

  const shadowClass = isShadowed
    ? "opacity-25 border-[var(--tile-border)]/50"
    : "";

  return (
    <div
      className={`${baseClasses} ${stateClass} ${activeClass} ${highlightClass} ${shadowClass}`}
    >
      {letter}
    </div>
  );
});

export default Cell;
