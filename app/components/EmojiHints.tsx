"use client";

import { useGameStore } from "../store/gameStore";

export default function EmojiHints() {
  const { puzzle, revealedEmojis } = useGameStore();

  if (!puzzle) return null;

  return (
    <div className="flex gap-4 sm:gap-6 justify-center mt-4 sm:mt-6">
      {puzzle.emojis.map((emoji, index) => (
        <div
          key={index}
          className={`text-3xl sm:text-4xl transition-all duration-300 ${
            index < revealedEmojis
              ? "opacity-100 scale-100"
              : "opacity-20 scale-90"
          }`}
        >
          {index < revealedEmojis ? emoji : "❓"}
        </div>
      ))}
    </div>
  );
}
