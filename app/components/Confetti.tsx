"use client";

import { useEffect, useState } from "react";

interface ConfettiProps {
  trigger: boolean;
  duration?: number;
}

interface ConfettiParticle {
  left: number;
  delay: number;
  duration: number;
  color: string;
}

export default function Confetti({ trigger, duration = 3000 }: ConfettiProps) {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (trigger) {
      // Generate particles when trigger becomes true
      const newParticles = Array.from({ length: 50 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      }));
      // Defer state update to avoid cascading renders
      setTimeout(() => {
        setParticles(newParticles);
        setIsActive(true);
      }, 0);
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute confetti-particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            backgroundColor: particle.color,
          }}
        />
      ))}
      <style jsx>{`
        .confetti-particle {
          width: 10px;
          height: 10px;
          position: absolute;
          top: -10px;
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
