"use client";

import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";

export default function EmojiHints() {
  const { puzzle, revealedEmojis } = useGameStore();

  const emojiElements = useMemo(() => {
    if (!puzzle) return null;

    return puzzle.emojis.map((emoji, index) => (
      <div
        key={index}
        className={`text-3xl sm:text-4xl transition-all duration-500 ease-out ${
          index < revealedEmojis
            ? "opacity-100 scale-100 animate-[reveal_0.5s_ease-out]"
            : "opacity-20 scale-90"
        }`}
      >
        {index < revealedEmojis ? emoji : "❓"}
      </div>
    ));
  }, [puzzle, revealedEmojis]);

  if (!puzzle) return null;

  return (
    <div className="flex gap-4 sm:gap-6 justify-center mt-4 sm:mt-6">
      {emojiElements}
    </div>
  );
}
