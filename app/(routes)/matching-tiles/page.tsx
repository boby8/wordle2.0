import GameController from "../../games/matching-tiles/components/GameController";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

export default function MatchingTilesPage() {
  return (
    <ErrorBoundary>
      <GameController />
    </ErrorBoundary>
  );
}
