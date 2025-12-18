"use client";

import { useGameStore } from "../store/gameStore";
import EmojiText from "./EmojiText";

export default function RuleBanner() {
  const { activeRule, round } = useGameStore();

  if (!activeRule) return null;

  return (
    <div className="w-full max-w-4xl mb-4 px-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm sm:text-base opacity-90 mb-1">
              Round {round} • Rule
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              {activeRule.name}
            </h3>
            <p className="font-bold text-2xl sm:text-3xl opacity-100 leading-relaxed mt-2">
              <EmojiText
                text={activeRule.description}
                emojiSize="text-5xl sm:text-6xl"
                textSize="text-2xl sm:text-3xl"
              />
            </p>
          </div>
          <div className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <div className="text-xs opacity-75">Difficulty</div>
            <div className="text-2xl font-bold">
              {"⭐".repeat(activeRule.difficulty)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
