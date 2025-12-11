"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import type { Puzzle } from "../types/game";
import { getDailyPuzzle } from "../lib/dailyPuzzle";
import { validatePuzzle } from "../lib/puzzleValidation";

interface GameInitializerProps {
  puzzle: Puzzle;
}

export default function GameInitializer({ puzzle }: GameInitializerProps) {
  const initializeGame = useGameStore((state) => state.initializeGame);
  const puzzleIdRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      // Validate puzzle before initializing
      let validPuzzle = puzzle;

      // If puzzle is invalid or empty, generate a new one
      if (!validatePuzzle(puzzle) || !puzzle.id || !puzzle.answer) {
        console.warn("Invalid puzzle received, generating new one:", {
          puzzle,
          hasId: !!puzzle?.id,
          hasAnswer: !!puzzle?.answer,
          isValid: validatePuzzle(puzzle),
        });
        try {
          validPuzzle = getDailyPuzzle();
          console.log("Generated new puzzle:", {
            id: validPuzzle.id,
            answer: validPuzzle.answer,
            isValid: validatePuzzle(validPuzzle),
          });
        } catch (error) {
          console.error("Failed to generate puzzle:", error);
          return;
        }
      }

      // Double-check the puzzle is valid before initializing
      if (!validatePuzzle(validPuzzle)) {
        console.error("Generated puzzle is still invalid:", validPuzzle);
        return;
      }

      // Only initialize if puzzle ID changed (avoid unnecessary re-initialization)
      if (puzzleIdRef.current !== validPuzzle.id) {
        puzzleIdRef.current = validPuzzle.id;
        initializeGame(validPuzzle);
      }
    } catch (error) {
      console.error("Error in GameInitializer:", error);
    }
  }, [puzzle, initializeGame]);

  return null;
}
