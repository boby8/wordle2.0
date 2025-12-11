"use client";

import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({
  href = "/",
  label = "Back to Home",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text)] hover:text-[var(--highlight)] transition-all duration-200 group rounded-lg hover:bg-[var(--tile-empty)]/30"
    >
      <span className="text-lg group-hover:-translate-x-1 transition-transform duration-200">
        ←
      </span>
      <span>{label}</span>
    </Link>
  );
}
