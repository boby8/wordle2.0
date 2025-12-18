"use client";

import { useMemo } from "react";
import GameController from "../../games/wordle/components/GameController";
import { getDailyPuzzle } from "../../games/wordle/lib/dailyPuzzle";
import GameInitializer from "../../games/wordle/components/GameInitializer";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

export default function WordlePage() {
  // Generate puzzle on client to avoid serialization issues
  // Daily puzzle is deterministic based on date, so it will be consistent
  const puzzle = useMemo(() => getDailyPuzzle(), []);

  return (
    <ErrorBoundary>
      <GameInitializer puzzle={puzzle} />
      <GameController />
    </ErrorBoundary>
  );
}
