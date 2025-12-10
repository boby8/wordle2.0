"use client";

import Link from "next/link";

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string | null;
  color: string;
}

const games: Game[] = [
  {
    id: "wordle",
    name: "Wordable",
    description:
      "Guess the word based on emoji hints. Each attempt reveals more emojis!",
    icon: "📝",
    route: "/routes/wordle",
    color: "var(--correct)",
  },
  {
    id: "matching-tiles",
    name: "Memory Match",
    description:
      "Match emoji pairs! Test your memory with this fun matching game.",
    icon: "🧩",
    route: "/routes/matching-tiles",
    color: "var(--present)",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-12 space-y-4 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[var(--correct)] via-[var(--present)] to-[var(--correct)] bg-clip-text text-transparent">
            Game Hub
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--text)]/80 font-medium">
            Choose a game to play
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => {
            const isComingSoon = game.route === null;
            const cardClassName = `group relative p-6 rounded-xl border-2 border-[var(--tile-border)] bg-[var(--tile-empty)]/30 backdrop-blur-sm hover:border-[var(--highlight)] transition-all duration-300 ${
              isComingSoon
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:scale-105 hover:shadow-xl"
            }`;

            const cardContent = (
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-6xl">{game.icon}</div>
                <h2 className="text-2xl font-bold text-[var(--text)]">
                  {game.name}
                </h2>
                <p className="text-sm text-[var(--text)]/70">
                  {game.description}
                </p>
                {isComingSoon ? (
                  <span className="px-4 py-2 bg-[var(--tile-empty)] text-[var(--text)]/50 rounded-lg text-sm font-medium">
                    Coming Soon
                  </span>
                ) : (
                  <span
                    className="px-6 py-2 text-white rounded-lg font-semibold transition-all duration-200 group-hover:scale-105"
                    style={{ backgroundColor: game.color }}
                  >
                    Play Now →
                  </span>
                )}
              </div>
            );

            return isComingSoon ? (
              <div key={game.id} className={cardClassName}>
                {cardContent}
              </div>
            ) : (
              <Link key={game.id} href={game.route!} className={cardClassName}>
                {cardContent}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-[var(--text)]/50">
          <p>More games coming soon!</p>
        </div>
      </div>
    </div>
  );
}
