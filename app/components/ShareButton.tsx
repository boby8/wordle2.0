"use client";

import { useState } from "react";
import { generateShareText, copyToClipboard } from "../lib/shareResults";
import type { Attempt, Puzzle } from "../types/game";

interface ShareButtonProps {
  attempts: Attempt[];
  puzzle: Puzzle;
  hasWon: boolean;
}

export default function ShareButton({
  attempts,
  puzzle,
  hasWon,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = generateShareText(attempts, puzzle, hasWon);
    const success = await copyToClipboard(shareText);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback: show share text in alert
      alert(shareText);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-[var(--keyboard-bg)] hover:bg-[var(--keyboard-hover)] text-[var(--keyboard-text)] rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2"
      aria-label="Share results"
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span>📤</span>
          <span>Share</span>
        </>
      )}
    </button>
  );
}
