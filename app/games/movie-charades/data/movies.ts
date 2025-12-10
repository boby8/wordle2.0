import type { Movie } from "../types/game";

export const movies: Movie[] = [
  // Bollywood Movies
  {
    id: "bollywood-1",
    category: "bollywood",
    title: "3 Idiots",
    emojis: ["3️⃣", "🧠", "👦"],
  },
  {
    id: "bollywood-2",
    category: "bollywood",
    title: "Koi Mil Gaya",
    emojis: ["👽", "🧒", "✨"],
  },
  {
    id: "bollywood-3",
    category: "bollywood",
    title: "Dangal",
    emojis: ["🤼", "👨", "👧"],
  },
  {
    id: "bollywood-4",
    category: "bollywood",
    title: "Lagaan",
    emojis: ["🏏", "🌾", "🇬🇧"],
  },
  {
    id: "bollywood-5",
    category: "bollywood",
    title: "PK",
    emojis: ["👽", "🙏", "❓"],
  },
  {
    id: "bollywood-6",
    category: "bollywood",
    title: "Bajrangi Bhaijaan",
    emojis: ["🙏", "👦", "🇵🇰"],
  },
  {
    id: "bollywood-7",
    category: "bollywood",
    title: "Dilwale Dulhania Le Jayenge",
    emojis: ["💑", "🚂", "🇮🇳"],
  },
  {
    id: "bollywood-8",
    category: "bollywood",
    title: "Sholay",
    emojis: ["🔫", "🐴", "🏜️"],
  },
  {
    id: "bollywood-9",
    category: "bollywood",
    title: "Taare Zameen Par",
    emojis: ["⭐", "👦", "🎨"],
  },
  {
    id: "bollywood-10",
    category: "bollywood",
    title: "Queen",
    emojis: ["👑", "✈️", "💃"],
  },
  {
    id: "bollywood-11",
    category: "bollywood",
    title: "Gully Boy",
    emojis: ["🎤", "🎵", "🏙️"],
  },
  {
    id: "bollywood-12",
    category: "bollywood",
    title: "Zindagi Na Milegi Dobara",
    emojis: ["✈️", "👬", "🌊"],
  },
  {
    id: "bollywood-13",
    category: "bollywood",
    title: "Andhadhun",
    emojis: ["🎹", "👁️", "🎭"],
  },
  {
    id: "bollywood-14",
    category: "bollywood",
    title: "Bahubali",
    emojis: ["👑", "⚔️", "🏰"],
  },
  {
    id: "bollywood-15",
    category: "bollywood",
    title: "Chak De India",
    emojis: ["🏑", "🇮🇳", "🏆"],
  },
  // Hollywood Movies
  {
    id: "hollywood-1",
    category: "hollywood",
    title: "Inception",
    emojis: ["🧠", "🌀", "💤"],
  },
  {
    id: "hollywood-2",
    category: "hollywood",
    title: "Titanic",
    emojis: ["🚢", "🧊", "💑"],
  },
  {
    id: "hollywood-3",
    category: "hollywood",
    title: "The Matrix",
    emojis: ["🕶️", "💊", "🔴"],
  },
  {
    id: "hollywood-4",
    category: "hollywood",
    title: "Jurassic Park",
    emojis: ["🦕", "🌴", "🏃"],
  },
  {
    id: "hollywood-5",
    category: "hollywood",
    title: "Avatar",
    emojis: ["🔵", "🌳", "👽"],
  },
  {
    id: "hollywood-6",
    category: "hollywood",
    title: "The Lion King",
    emojis: ["🦁", "👑", "🌍"],
  },
  {
    id: "hollywood-7",
    category: "hollywood",
    title: "Frozen",
    emojis: ["❄️", "👑", "✨"],
  },
  {
    id: "hollywood-8",
    category: "hollywood",
    title: "The Avengers",
    emojis: ["🦸", "💥", "🌍"],
  },
  {
    id: "hollywood-9",
    category: "hollywood",
    title: "Harry Potter",
    emojis: ["🧙", "⚡", "🦉"],
  },
  {
    id: "hollywood-10",
    category: "hollywood",
    title: "Finding Nemo",
    emojis: ["🐠", "🌊", "🔍"],
  },
  {
    id: "hollywood-11",
    category: "hollywood",
    title: "Toy Story",
    emojis: ["🧸", "🤠", "⭐"],
  },
  {
    id: "hollywood-12",
    category: "hollywood",
    title: "The Dark Knight",
    emojis: ["🦇", "🌃", "🃏"],
  },
  {
    id: "hollywood-13",
    category: "hollywood",
    title: "Iron Man",
    emojis: ["🤖", "⚡", "🦾"],
  },
  {
    id: "hollywood-14",
    category: "hollywood",
    title: "Spider Man",
    emojis: ["🕷️", "🕸️", "🦸"],
  },
  {
    id: "hollywood-15",
    category: "hollywood",
    title: "The Godfather",
    emojis: ["🍷", "💼", "👔"],
  },
];

export function getMoviesByCategory(
  category: "bollywood" | "hollywood"
): Movie[] {
  return movies.filter((movie) => movie.category === category);
}
