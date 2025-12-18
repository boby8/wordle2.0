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
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          🎯 How To Play Signal vs Noise
        </h2>

        {/* Rules Section */}
        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">
              Objective
            </h3>
            <p>
              Click on <strong>signal</strong> items (correct items based on the rule) and avoid <strong>noise</strong> items (distractions).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">
              Rules
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Each round has a specific rule shown at the top</li>
              <li>Click items that match the rule (signal) to score points</li>
              <li>Avoid clicking items that don't match (noise) - you'll lose a life</li>
              <li>Build combos by clicking signals consecutively for bonus points</li>
              <li>You have 3 lives - lose them all and the game ends</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">
              Scoring
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Signal hit:</strong> +10 points</li>
              <li><strong>Noise hit:</strong> -5 points, lose 1 life</li>
              <li><strong>Combo (3+):</strong> Bonus points based on combo length</li>
              <li><strong>Speed bonus:</strong> Faster completion = more points</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">
              Difficulty
            </h3>
            <p>
              Difficulty increases as you progress through rounds. More items spawn, faster speeds, and more complex rules!
            </p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <strong>Tip:</strong> Read the rule carefully before clicking! Rules can change based on round number, score, or combo count.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

