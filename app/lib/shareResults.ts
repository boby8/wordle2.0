import type { Attempt, Puzzle } from "../types/game";

/**
 * Generate a shareable emoji grid (Wordle-style)
 * 🟩 = correct (green)
 * 🟨 = present (yellow)
 * ⬜ = absent (gray)
 */
export function generateShareText(
  attempts: Attempt[],
  puzzle: Puzzle,
  hasWon: boolean
): string {
  const emojiGrid = attempts
    .map((attempt) => {
      return attempt.result
        .map((state) => {
          switch (state) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            case "absent":
              return "⬜";
            default:
              return "⬜";
          }
        })
        .join("");
    })
    .join("\n");

  const puzzleNumber = getPuzzleNumber(puzzle.id);
  const result = hasWon ? `${attempts.length}/6` : "X/6";
  const emojis = puzzle.emojis.join(" ");

  return `Wordable ${puzzleNumber} ${result}\n\n${emojiGrid}\n\n${emojis}`;
}

/**
 * Get puzzle number from puzzle ID
 * daily-2025-01-15 -> 1 (days since epoch or similar)
 */
export function getPuzzleNumber(puzzleId: string): number {
  if (!puzzleId.startsWith("daily-")) {
    return 0;
  }

  const dateString = puzzleId.replace("daily-", "");
  const [year, month, day] = dateString.split("-").map(Number);
  const puzzleDate = new Date(Date.UTC(year, month - 1, day));
  const epoch = new Date(Date.UTC(2025, 0, 1)); // Start from Jan 1, 2025
  const diffTime = puzzleDate.getTime() - epoch.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Start from puzzle #1
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}
