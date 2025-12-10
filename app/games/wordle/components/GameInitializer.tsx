"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import type { Puzzle } from "../types/game";

interface GameInitializerProps {
  puzzle: Puzzle;
}

export default function GameInitializer({ puzzle }: GameInitializerProps) {
  const initializeGame = useGameStore((state) => state.initializeGame);
  const puzzleIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Only initialize if puzzle ID changed (avoid unnecessary re-initialization)
    if (puzzleIdRef.current !== puzzle.id) {
      puzzleIdRef.current = puzzle.id;
      initializeGame(puzzle);
    }
  }, [puzzle.id, puzzle, initializeGame]);

  return null;
}
