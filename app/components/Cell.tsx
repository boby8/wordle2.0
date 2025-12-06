"use client";

import type { CellState } from "../types/game";

interface CellProps {
  letter?: string;
  state: CellState;
  isActive?: boolean;
  isHighlighted?: boolean;
  isShadowed?: boolean;
}

const stateColors = {
  empty: "bg-gray-800 border-gray-700",
  correct: "bg-green-600 border-green-500",
  present: "bg-orange-500 border-orange-400",
  absent: "bg-gray-700 border-gray-600",
};

export default function Cell({
  letter,
  state,
  isActive = false,
  isHighlighted = false,
  isShadowed = false,
}: CellProps) {
  const baseClasses =
    "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold text-white transition-all duration-200";
  const stateClass = stateColors[state];
  const activeClass = isActive
    ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-black"
    : "";

  // Highlight required length area with a distinct border
  // Cells within required length get a teal border to show the valid area
  const highlightClass =
    isHighlighted && state === "empty"
      ? "border-teal-500/60 border-dashed"
      : "";

  // Shadow cells outside required length - these are not part of the answer
  const shadowClass = isShadowed ? "opacity-25 border-gray-600/50" : "";

  return (
    <div
      className={`${baseClasses} ${stateClass} ${activeClass} ${highlightClass} ${shadowClass}`}
    >
      {letter}
    </div>
  );
}
