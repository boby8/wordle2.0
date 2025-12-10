"use client";

import { memo } from "react";
import type { CellState } from "../types/game";

interface CellProps {
  letter?: string;
  state: CellState;
  isActive?: boolean;
  isHighlighted?: boolean;
  isShadowed?: boolean;
  cellIndex?: number;
}

const Cell = memo(function Cell({
  letter,
  state,
  isActive = false,
  isHighlighted = false,
  isShadowed = false,
  cellIndex = 0,
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
    "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300 ease-out rounded-sm";
  const stateClass = getStateStyles(state);

  // Active cell - single solid border with pulse animation
  const activeClass = isActive
    ? "border-[var(--highlight)] border-2 animate-pulse"
    : "";

  // Highlighted cells (required length area) - dashed border only if not active
  const highlightClass =
    isHighlighted && state === "empty" && !isActive
      ? "border-[var(--highlight)]/50 border-dashed"
      : "";

  // Shadowed cells (outside required length) - subtle border
  const shadowClass =
    isShadowed && state === "empty" && !isActive
      ? "border-[var(--tile-border)]/30 opacity-50"
      : "";

  // Wordle-style flip animation when state is revealed (not empty)
  // Stagger the animation based on cell position
  const flipAnimation =
    state !== "empty" ? "animate-[wordleFlip_0.6s_ease-in-out]" : "";
  const animationDelay = state !== "empty" ? `${cellIndex * 0.1}s` : undefined;

  return (
    <div
      className={`${baseClasses} ${stateClass} ${activeClass} ${highlightClass} ${shadowClass} ${flipAnimation}`}
      style={{
        animationDelay,
      }}
    >
      {letter}
    </div>
  );
});

export default Cell;
