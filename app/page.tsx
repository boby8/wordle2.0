import GameController from "./components/GameController";
import { getDailyPuzzle } from "./lib/dailyPuzzle";
import GameInitializer from "./components/GameInitializer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  // SSR: Load puzzle on server
  // Always use daily puzzle for consistent SSR/client hydration
  // Daily puzzle is deterministic based on date, preventing hydration mismatches
  const puzzle = getDailyPuzzle();

  return (
    <ErrorBoundary>
      <GameInitializer puzzle={puzzle} />
      <GameController />
    </ErrorBoundary>
  );
}
