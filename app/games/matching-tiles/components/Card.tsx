"use client";

import { memo } from "react";
import type { Card as CardType } from "../types/game";

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card = memo(function Card({ card, onClick }: CardProps) {
  const isFlipped = card.isFlipped || card.isMatched;
  // Disable if card is already flipped or matched
  const shouldDisable = card.isFlipped || card.isMatched;

  return (
    <button
      onClick={onClick}
      disabled={shouldDisable}
      className={`
        relative w-full aspect-square rounded-lg
        transition-all duration-300
        ${card.isMatched ? "opacity-60" : ""}
        ${shouldDisable ? "cursor-default" : "cursor-pointer hover:scale-105"}
      `}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (emoji) - shows when flipped */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-lg
            bg-gradient-to-br from-blue-400 to-purple-500
            flex items-center justify-center text-4xl sm:text-5xl
            shadow-lg border-2 border-white/20
            transition-transform duration-300
          `}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {card.emoji}
        </div>
        {/* Back of card (question mark) - shows when not flipped */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-lg
            bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700
            flex items-center justify-center
            shadow-lg border-2 border-white/20 dark:border-gray-500/20
            transition-transform duration-300
          `}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <span className="text-3xl sm:text-4xl">❓</span>
        </div>
      </div>
    </button>
  );
});

export default Card;
