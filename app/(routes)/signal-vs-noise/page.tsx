import GameController from "../../games/signal-vs-noise/components/GameController";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

export default function SignalVsNoisePage() {
  return (
    <ErrorBoundary>
      <GameController />
    </ErrorBoundary>
  );
}

