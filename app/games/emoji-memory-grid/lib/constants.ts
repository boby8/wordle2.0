import type { LevelConfig } from "../types/game";

export const EMOJI_POOL = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "😚",
  "😙",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🤫",
  "🤔",
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍉",
  "🍑",
  "🍒",
  "🍊",
  "🥭",
  "🍍",
  "⚽",
  "🏀",
  "🏈",
  "⚾",
  "🎾",
  "🏐",
  "🏉",
  "🎱",
  "🏓",
  "🏸",
];

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1: { rows: 2, cols: 2, emojiCount: 4, showTime: 2.0 },
  2: { rows: 2, cols: 3, emojiCount: 6, showTime: 1.8 },
  3: { rows: 3, cols: 3, emojiCount: 9, showTime: 1.6 },
  4: { rows: 3, cols: 4, emojiCount: 12, showTime: 1.4 },
  5: { rows: 4, cols: 4, emojiCount: 16, showTime: 1.2 },
};

export const MAX_LEVEL = 5;

export function getRank(accuracy: number): string {
  if (accuracy >= 95) return "S";
  if (accuracy >= 85) return "A";
  if (accuracy >= 75) return "B";
  if (accuracy >= 60) return "C";
  return "F";
}
