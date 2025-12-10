"use client";

import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";
import Card from "./Card";
import { DIFFICULTY_CONFIGS } from "../lib/constants";

export default function Grid() {
  const { cards, difficulty, flipCard } = useGameStore();
  const config = DIFFICULTY_CONFIGS[difficulty];

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
    }),
    [config.cols]
  );

  if (cards.length === 0) return null;

  return (
    <div
      className="grid gap-2 sm:gap-3 w-full max-w-4xl mx-auto"
      style={gridStyle}
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => flipCard(card.id)} />
      ))}
    </div>
  );
}
