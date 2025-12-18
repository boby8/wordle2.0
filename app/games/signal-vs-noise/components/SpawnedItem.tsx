"use client";

import { useEffect, useState } from "react";
import type { SpawnedItem as SpawnedItemType } from "../types/game";

interface SpawnedItemProps {
  item: SpawnedItemType;
  onClick: () => void;
}

export default function SpawnedItem({ item, onClick }: SpawnedItemProps) {
  const [position, setPosition] = useState({ x: item.x, y: item.y });
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  // Update position if item has velocity
  useEffect(() => {
    if (!item.velocity) return;

    const interval = setInterval(() => {
      setPosition((prev) => ({
        x: Math.max(5, Math.min(95, prev.x + item.velocity!.x)),
        y: Math.max(5, Math.min(95, prev.y + item.velocity!.y)),
      }));
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [item.velocity]);

  // Fade out as item expires and pulse animation
  useEffect(() => {
    let animationFrameId: number | undefined;

    const updateOpacity = () => {
      const elapsed = Date.now() - item.spawnTime;
      const remaining = item.lifetime - elapsed;
      const fadeStart = item.lifetime * 0.7; // Start fading at 70% of lifetime

      if (remaining < fadeStart) {
        const fadeProgress =
          (item.lifetime - remaining) / (item.lifetime - fadeStart);
        // Use requestAnimationFrame to defer state update
        animationFrameId = requestAnimationFrame(() => {
          setOpacity(1 - fadeProgress);
        });
      }
    };

    // Initial opacity check
    updateOpacity();

    // Update opacity periodically
    const opacityInterval = setInterval(updateOpacity, 100);

    // Pulse animation
    const pulseInterval = setInterval(() => {
      requestAnimationFrame(() => {
        setScale((prev) => (prev === 1 ? 1.1 : 1));
      });
    }, 500);

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
      clearInterval(opacityInterval);
      clearInterval(pulseInterval);
    };
  }, [item.spawnTime, item.lifetime]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="absolute transition-all duration-100 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${scale * item.size})`,
        opacity,
        fontSize: "5rem",
        zIndex: 10,
        minWidth: "64px",
        minHeight: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label={`Click ${item.type === "signal" ? "signal" : "noise"} item`}
    >
      {item.emoji}
    </button>
  );
}
