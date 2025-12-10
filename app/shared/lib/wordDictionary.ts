import words from "an-array-of-english-words";

// Lazy-load dictionary - initialize on first use
let wordSet: Set<string> | null = null;
let wordsByLength: Record<number, Set<string>> | null = null;

function ensureInitialized() {
  if (wordSet && wordsByLength) {
    return; // Already initialized
  }

  // Get words array (handle both default export and named export)
  const wordsArray = Array.isArray(words)
    ? words
    : (words as { default?: string[] }).default || [];

  // Convert to Set for O(1) lookup
  wordSet = new Set(wordsArray.map((word: string) => word.toUpperCase()));

  // Filter words by length for faster lookups
  wordsByLength = {};

  wordsArray.forEach((word: string) => {
    const upper = word.toUpperCase();
    const len = upper.length;
    if (!wordsByLength![len]) {
      wordsByLength![len] = new Set();
    }
    wordsByLength![len].add(upper);
  });
}

export function isValidEnglishWord(word: string): boolean {
  ensureInitialized();
  if (!wordSet) {
    // Fallback if initialization failed
    console.warn("Dictionary not initialized, skipping validation");
    return true; // Allow word to pass validation if dictionary fails
  }
  const upper = word.toUpperCase();
  return wordSet.has(upper);
}

export function getWordsByLength(length: number): string[] {
  ensureInitialized();
  if (!wordsByLength) {
    return [];
  }
  return Array.from(wordsByLength[length] || []);
}

export function searchWordsByPattern(
  pattern: string,
  length?: number
): string[] {
  ensureInitialized();
  if (!wordSet || !wordsByLength) {
    return [];
  }
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
