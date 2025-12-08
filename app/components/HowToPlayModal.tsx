"use client";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({
  isOpen,
  onClose,
}: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg)] rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative border border-[var(--tile-border)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text)] hover:text-[var(--error)] transition-colors text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--text)] mb-6 text-center">
          How To Play
        </h2>

        {/* Rules Section */}
        <div className="mb-6">
          <p className="text-sm text-[var(--text)] mb-4">
            Guess the word based on the emoji hints in 6 tries.
          </p>
          <ul className="text-sm text-[var(--text)] space-y-2 mb-4 list-disc list-inside">
            <li>Each guess must be a valid word from the allowed list.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>

          {/* Examples */}
          <div className="space-y-4">
            <div>
              <div className="flex gap-1 mb-2">
                <div
                  className="w-10 h-10 border-2 flex items-center justify-center font-bold text-white rounded"
                  style={{
                    backgroundColor: "var(--correct)",
                    borderColor: "var(--correct-border)",
                  }}
                >
                  W
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  O
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  R
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  D
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  Y
                </div>
              </div>
              <p className="text-xs text-[var(--text)] opacity-70">
                W is in the word and in the correct spot.
              </p>
            </div>

            <div>
              <div className="flex gap-1 mb-2">
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  L
                </div>
                <div
                  className="w-10 h-10 border-2 flex items-center justify-center font-bold text-white rounded"
                  style={{
                    backgroundColor: "var(--present)",
                    borderColor: "var(--present-border)",
                  }}
                >
                  I
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  G
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  H
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  T
                </div>
              </div>
              <p className="text-xs text-[var(--text)] opacity-70">
                I is in the word but in the wrong spot.
              </p>
            </div>

            <div>
              <div className="flex gap-1 mb-2">
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  R
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  O
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  G
                </div>
                <div
                  className="w-10 h-10 border-2 flex items-center justify-center font-bold text-white rounded"
                  style={{
                    backgroundColor: "var(--absent)",
                    borderColor: "var(--absent-border)",
                  }}
                >
                  U
                </div>
                <div className="w-10 h-10 border-2 flex items-center justify-center font-bold text-[var(--text)] rounded bg-[var(--tile-empty)] border-[var(--tile-empty-border)]">
                  E
                </div>
              </div>
              <p className="text-xs text-[var(--text)] opacity-70">
                U is not in the word in any spot.
              </p>
            </div>
          </div>

          <p className="text-xs text-[var(--text)] opacity-70 mt-4 text-center">
            A new puzzle is released each day!
          </p>
        </div>
      </div>
    </div>
  );
}
