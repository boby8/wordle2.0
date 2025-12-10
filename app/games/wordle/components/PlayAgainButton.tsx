"use client";

import { memo, useCallback } from "react";
import { useGameStore } from "../store/gameStore";

const PlayAgainButton = memo(() => {
  const resetGame = useGameStore((state) => state.resetGame);

  const handleClick = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return (
    <button
      onClick={handleClick}
      className="mt-6 sm:mt-8 px-6 py-3 bg-[var(--success)] hover:bg-[var(--success)]/90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 hover:shadow-xl"
    >
      Play Again
    </button>
  );
});

PlayAgainButton.displayName = "PlayAgainButton";

export default PlayAgainButton;
