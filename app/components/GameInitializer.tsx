"use client";

import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import type { Puzzle } from "../types/game";

interface GameInitializerProps {
  puzzle: Puzzle;
}

export default function GameInitializer({ puzzle }: GameInitializerProps) {
  const initializeGame = useGameStore((state) => state.initializeGame);

  useEffect(() => {
    initializeGame(puzzle);
  }, [puzzle, initializeGame]);

  return null;
}
