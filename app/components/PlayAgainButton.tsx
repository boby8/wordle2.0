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
      className="mt-6 sm:mt-8 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors shadow-lg"
    >
      Play Again
    </button>
  );
});

PlayAgainButton.displayName = "PlayAgainButton";

export default PlayAgainButton;
