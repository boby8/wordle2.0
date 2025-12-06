import GameController from "./components/GameController";
import { getRandomPuzzle } from "./data/puzzles";
import { getDailyPuzzle } from "./lib/dailyPuzzle";
import GameInitializer from "./components/GameInitializer";

export default function Home() {
  // SSR: Load puzzle on server
  // Use daily puzzle for consistent experience, or random for testing
  const useDaily = process.env.NEXT_PUBLIC_USE_DAILY_PUZZLE === "true";
  const puzzle = useDaily ? getDailyPuzzle() : getRandomPuzzle();

  return (
    <>
      <GameInitializer puzzle={puzzle} />
      <GameController />
    </>
  );
}
