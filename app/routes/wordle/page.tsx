import GameController from "../../games/wordle/components/GameController";
import { getDailyPuzzle } from "../../games/wordle/lib/dailyPuzzle";
import GameInitializer from "../../games/wordle/components/GameInitializer";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

export default function WordlePage() {
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
