import GameController from "../../games/movie-charades/components/GameController";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

export default function MovieCharadesPage() {
  return (
    <ErrorBoundary>
      <GameController />
    </ErrorBoundary>
  );
}
