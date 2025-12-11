"use client";

import { motion } from "framer-motion";
import type { GameItem } from "../types/game";

interface EmojiDisplayProps {
  item: GameItem | null;
}

export default function EmojiDisplay({ item }: EmojiDisplayProps) {
  if (!item) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {item.emojis.map((emoji, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="text-6xl sm:text-7xl md:text-8xl"
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
