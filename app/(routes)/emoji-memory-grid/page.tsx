import EmojiMemoryGridGame from "../../games/emoji-memory-grid/components/GameController";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

export default function EmojiMemoryGridPage() {
  return (
    <ErrorBoundary>
      <EmojiMemoryGridGame />
    </ErrorBoundary>
  );
}
