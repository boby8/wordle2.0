import type { Movie } from "../types/game";

/**
 * Normalize answer for comparison (case-insensitive, trim, remove punctuation, normalize spaces)
 */
export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Normalize spaces
    .replace(/\s/g, ""); // Remove all spaces for better matching
}

/**
 * Common spelling variations for Bollywood movie titles
 * Maps normalized title to common variations
 */
const SPELLING_VARIATIONS: Record<string, string[]> = {
  dilwaledulhanialejayenge: [
    "dilwaledulhaniyalejayenge",
    "dilwaledulhaniyalejayege",
    "dilwaledulhaniyalejayenge",
    "dilwaledulhaniyalejayenge",
    "dilwaledulhaniyalejayenge",
  ],
  dilwaledulhaniyalejayenge: [
    "dilwaledulhanialejayenge",
    "dilwaledulhaniyalejayege",
  ],
  dilwaledulhaniyalejayege: [
    "dilwaledulhanialejayenge",
    "dilwaledulhaniyalejayenge",
  ],
  koimilgaya: ["koimilgaya"],
  "3idiots": ["threeidiots"],
  bajrangibhaijaan: ["bajrangibhaijan"],
};

/**
 * Character replacements for common spelling variations in Romanized Hindi
 */
function normalizeRomanizedHindi(text: string): string {
  return text
    .replace(/h/g, "") // Remove 'h' for variations like "dulhania" vs "dulania"
    .replace(/ee/g, "e") // Normalize double 'e'
    .replace(/aa/g, "a") // Normalize double vowels
    .replace(/ii/g, "i")
    .replace(/uu/g, "u");
}

/**
 * Check if answer matches movie title (with spelling variations)
 */
export function isAnswerCorrect(
  userAnswer: string,
  movieTitle: string
): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedTitle = normalizeAnswer(movieTitle);

  // Exact match
  if (normalizedUser === normalizedTitle) {
    return true;
  }

  // Check spelling variations
  const variations = SPELLING_VARIATIONS[normalizedTitle] || [];
  if (variations.includes(normalizedUser)) {
    return true;
  }

  // Check if user answer matches any variation of the title
  const userVariations = SPELLING_VARIATIONS[normalizedUser] || [];
  if (userVariations.includes(normalizedTitle)) {
    return true;
  }

  // Try Romanized Hindi normalization (remove 'h' and normalize vowels)
  const romanizedUser = normalizeRomanizedHindi(normalizedUser);
  const romanizedTitle = normalizeRomanizedHindi(normalizedTitle);
  if (romanizedUser === romanizedTitle) {
    return true;
  }

  // Additional normalization: handle "jayenge" vs "jayege" (ng variations)
  // Remove 'n' before 'g' to handle "jayenge" vs "jayege"
  const userNoNg = normalizedUser.replace(/n(?=g)/g, "").replace(/ng/g, "g");
  const titleNoNg = normalizedTitle.replace(/n(?=g)/g, "").replace(/ng/g, "g");
  if (userNoNg === titleNoNg) {
    return true;
  }

  // Also try removing 'n' completely before 'ge' endings
  const userNoN = normalizedUser.replace(/n(?=ge)/g, "");
  const titleNoN = normalizedTitle.replace(/n(?=ge)/g, "");
  if (userNoN === titleNoN) {
    return true;
  }

  // Handle "dulhania" vs "dulaniya" - remove 'h' and normalize 'ia' vs 'iya'
  const userNoH = normalizedUser.replace(/h/g, "").replace(/iya/g, "ia");
  const titleNoH = normalizedTitle.replace(/h/g, "").replace(/iya/g, "ia");
  if (userNoH === titleNoH) {
    return true;
  }

  // Fuzzy match: check if 80% of characters match (for common typos and variations)
  if (normalizedUser.length > 5 && normalizedTitle.length > 5) {
    const similarity = calculateSimilarity(normalizedUser, normalizedTitle);
    if (similarity >= 0.8) {
      // 80% similarity threshold (lowered for better matching)
      return true;
    }

    // Also check similarity with Romanized normalization
    const romanizedSimilarity = calculateSimilarity(
      romanizedUser,
      romanizedTitle
    );
    if (romanizedSimilarity >= 0.8) {
      return true;
    }

    // Check similarity with ng removed
    const ngSimilarity = calculateSimilarity(userNoNg, titleNoNg);
    if (ngSimilarity >= 0.8) {
      return true;
    }
  }

  return false;
}

/**
 * Calculate similarity between two strings (Levenshtein distance based)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Get a random movie from category that hasn't been used
 */
export function getRandomMovie(
  movies: Movie[],
  usedMovieIds: string[]
): Movie | null {
  const availableMovies = movies.filter(
    (movie) => !usedMovieIds.includes(movie.id)
  );
  if (availableMovies.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableMovies.length);
  return availableMovies[randomIndex];
}
