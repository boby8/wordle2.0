export type Category = "bollywood" | "hollywood";
export type GameMode = "movies" | "songs";

export type Movie = {
  id: string;
  category: Category;
  title: string;
  emojis: string[];
};

export type Song = {
  id: string;
  category: Category;
  title: string;
  artist: string;
  emojis: string[];
};

export type GameItem = Movie | Song;

export type GameState = {
  gameMode: GameMode;
  selectedCategory: Category;
  currentItemIndex: number;
  score: number;
  attempts: number;
  isCorrect: boolean | null;
  usedItemIds: string[];
  isGameComplete: boolean;
};
