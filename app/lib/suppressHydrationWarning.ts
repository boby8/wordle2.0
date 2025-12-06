/**
 * Suppress hydration warnings for browser extensions
 * Browser extensions (like Grammarly) add attributes to the DOM
 * which cause harmless hydration mismatches
 */

export const suppressHydrationWarning = true;
