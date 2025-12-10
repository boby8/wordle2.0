"use client";

import { getPuzzleNumber } from "../lib/shareResults";
import type { Puzzle } from "../types/game";

interface DailyPuzzleIndicatorProps {
  puzzle: Puzzle;
}

export default function DailyPuzzleIndicator({
  puzzle,
}: DailyPuzzleIndicatorProps) {
  const puzzleNumber = getPuzzleNumber(puzzle.id);
  const isDaily = puzzle.id.startsWith("daily-");

  if (!isDaily) return null;

  // Extract date from puzzle ID
  const dateString = puzzle.id.replace("daily-", "");
  const [year, month, day] = dateString.split("-");
  const date = new Date(
    Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))
  );
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="text-center mb-2">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--tile-empty)]/30 backdrop-blur-sm border border-[var(--tile-border)]/50 rounded-full text-sm text-[var(--text)]">
        <span className="font-semibold">Puzzle #{puzzleNumber}</span>
        <span className="opacity-60">•</span>
        <span className="opacity-70">{formattedDate}</span>
      </div>
    </div>
  );
}
