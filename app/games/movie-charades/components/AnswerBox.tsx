"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

export default function AnswerBox() {
  const { currentItem, submitAnswer, isCorrect, nextItem, gameMode } =
    useGameStore();
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when item changes (answer resets via key prop)
    inputRef.current?.focus();
  }, [currentItem?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || !currentItem) return;

    submitAnswer(answer);
  };

  const handleNext = () => {
    nextItem();
    setAnswer("");
  };

  if (!currentItem) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          animate={
            isCorrect === false
              ? {
                  x: [0, -10, 10, -10, 10, 0],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          <input
            key={currentItem?.id} // Reset input when item changes
            ref={inputRef}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={
              gameMode === "movies" ? "Guess the movie..." : "Guess the song..."
            }
            disabled={isCorrect === true}
            className={`
              w-full px-4 py-3 text-lg rounded-xl border-2 transition-all duration-200
              ${
                isCorrect === true
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : isCorrect === false
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500
              disabled:opacity-70
            `}
          />
        </motion.div>

        {isCorrect === true ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            type="button"
            onClick={handleNext}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
          >
            Next →
          </motion.button>
        ) : (
          <button
            type="submit"
            disabled={!answer.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
