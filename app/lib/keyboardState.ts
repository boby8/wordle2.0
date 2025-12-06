import type { CellState } from "../types/game";

/**
 * Updates keyboard state based on guess result
 * Only updates if new state is better (correct > present > absent)
 */
export function updateKeyboardState(
  currentKeyboardState: Record<string, CellState>,
  guess: string,
  result: CellState[]
): Record<string, CellState> {
  const keyboardState = { ...currentKeyboardState };

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    const currentState = keyboardState[letter];
    const newState = result[i];

    // Only update if new state is better (correct > present > absent)
    if (
      !currentState ||
      newState === "correct" ||
      (newState === "present" && currentState === "absent")
    ) {
      keyboardState[letter] = newState;
    }
  }

  return keyboardState;
}
