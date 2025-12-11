"use client";

import { motion } from "framer-motion";
import EmojiDisplay from "./EmojiDisplay";
import AnswerBox from "./AnswerBox";
import { useGameStore } from "../store/gameStore";

export default function MovieCard() {
  const { currentItem, isCorrect, score, isGameComplete } = useGameStore();

  if (isGameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12 max-w-2xl mx-auto text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Game Complete!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Final Score:{" "}
          <span className="font-bold text-purple-600">{score}</span>
        </p>
        <button
          onClick={() => useGameStore.getState().resetGame()}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
        >
          Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-3xl mx-auto"
    >
      {/* Score Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
          <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Emoji Display */}
      <div className="mb-8">
        <EmojiDisplay item={currentItem} />
      </div>

      {/* Show artist for songs */}
      {currentItem && "artist" in currentItem && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            by {currentItem.artist}
          </p>
        </div>
      )}

      {/* Answer Box */}
      <AnswerBox />

      {/* Feedback */}
      {isCorrect === true && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center"
        >
          <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
            ✅ Correct! Well done!
          </p>
        </motion.div>
      )}
      {isCorrect === false && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center"
        >
          <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
            ❌ Try again!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
