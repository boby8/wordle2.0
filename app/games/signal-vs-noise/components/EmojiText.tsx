"use client";

interface EmojiTextProps {
  text: string;
  emojiSize?: string;
  textSize?: string;
}

export default function EmojiText({
  text,
  emojiSize = "text-4xl sm:text-5xl",
  textSize = "text-2xl sm:text-3xl",
}: EmojiTextProps) {
  // Create new regex instance each time to avoid mutation
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = emojiRegex.exec(text)) !== null) {
    // Add text before emoji
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    // Add emoji
    parts.push({
      type: "emoji",
      content: match[0],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  // If no emojis found, just return text
  if (parts.length === 0 || parts.every((p) => p.type === "text")) {
    return <span className={textSize}>{text}</span>;
  }

  return (
    <span className={textSize}>
      {parts.map((part, index) => {
        if (part.type === "emoji") {
          return (
            <span
              key={index}
              className={`${emojiSize} inline-block mx-1 align-middle`}
            >
              {part.content}
            </span>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
}
