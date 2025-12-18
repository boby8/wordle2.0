"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useGameStore } from "../store/gameStore";

export default function LevelUpNotification() {
  const { round, difficulty } = useGameStore();
  const [showRound, setShowRound] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevRoundRef = useRef(round);

  const hideNotification = useCallback(() => {
    setShowRound(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Check if round increased
    if (round > prevRoundRef.current && round > 1) {
      // Use setTimeout to defer state update
      const timeoutId = setTimeout(() => {
        setShowRound(round);
        prevRoundRef.current = round;

        // Hide after 2.5 seconds
        timerRef.current = setTimeout(() => {
          hideNotification();
        }, 2500);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      prevRoundRef.current = round;
    }
  }, [round, hideNotification]);

  if (showRound !== round || !showRound) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl transform animate-[scaleIn_0.3s_ease-out] pointer-events-auto">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold mb-2">Level Up!</h2>
          <p className="text-xl opacity-90 mb-1">Round {round}</p>
          <p className="text-lg opacity-75">{difficulty.name}</p>
        </div>
      </div>
    </div>
  );
}
