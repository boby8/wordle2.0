export type Category = "bollywood" | "hollywood";

export type Movie = {
  id: string;
  category: Category;
  title: string;
  emojis: string[];
};

export type GameState = {
  selectedCategory: Category;
  currentMovieIndex: number;
  score: number;
  attempts: number;
  isCorrect: boolean | null;
  usedMovieIds: string[];
  isGameComplete: boolean;
};
