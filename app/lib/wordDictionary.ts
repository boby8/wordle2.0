import words from "an-array-of-english-words";

// Convert to Set for O(1) lookup
const wordSet = new Set(words.map((word: string) => word.toUpperCase()));

// Filter words by length for faster lookups
const wordsByLength: Record<number, Set<string>> = {};

words.forEach((word: string) => {
  const upper = word.toUpperCase();
  const len = upper.length;
  if (!wordsByLength[len]) {
    wordsByLength[len] = new Set();
  }
  wordsByLength[len].add(upper);
});

export function isValidEnglishWord(word: string): boolean {
  const upper = word.toUpperCase();
  return wordSet.has(upper);
}

export function getWordsByLength(length: number): string[] {
  return Array.from(wordsByLength[length] || []);
}

export function searchWordsByPattern(
  pattern: string,
  length?: number
): string[] {
  const upperPattern = pattern.toUpperCase();
  const searchSet = length ? wordsByLength[length] || new Set() : wordSet;

  return Array.from(searchSet).filter((word) => {
    if (word.length !== upperPattern.length) return false;
    for (let i = 0; i < upperPattern.length; i++) {
      if (upperPattern[i] !== "_" && upperPattern[i] !== word[i]) {
        return false;
      }
    }
    return true;
  });
}
