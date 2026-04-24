import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sort containers by position
 */
export function sortByPosition<T extends { position?: number }>(
  items: T[],
): T[] {
  console.log("[UTILS] sortByPosition called with:", {
    itemsCount: items?.length || 0,
    sampleItem: items?.[0],
  });

  if (!items || items.length === 0) {
    console.log("[UTILS] No items to sort");
    return [];
  }

  const sorted = [...items].sort((a, b) => {
    const posA = a.position ?? 0;
    const posB = b.position ?? 0;
    return posA - posB;
  });

  console.log("[UTILS] Sorted result:", {
    count: sorted.length,
    firstPosition: sorted[0]?.position,
    lastPosition: sorted[sorted.length - 1]?.position,
  });

  return sorted;
}

/**
 * Filter containers by language
 */
export function filterByLanguage<T extends { language?: string }>(
  items: T[],
  language: string,
): T[] {
  console.log("[UTILS] filterByLanguage called with:", {
    itemsCount: items?.length || 0,
    language,
    sampleItem: items?.[0],
  });

  if (!items || items.length === 0) {
    console.log("[UTILS] No items to filter");
    return [];
  }

  // If no language field exists, return all items
  const hasLanguageField = items.some((item) => item.language !== undefined);
  if (!hasLanguageField) {
    console.log("[UTILS] No language field found in items, returning all");
    return items;
  }

  const filtered = items.filter((item) => item.language === language);
  const availableLanguages = [...new Set(items.map((i) => i.language))];

  console.log("[UTILS] Filtered result:", {
    originalCount: items.length,
    filteredCount: filtered.length,
    requestedLang: language,
    availableLanguages: availableLanguages,
  });

  // If no items match the requested language, return all items
  // (This handles cases where backend uses different language codes)
  if (filtered.length === 0) {
    console.warn(
      `[UTILS] No items found for language "${language}". Available: ${availableLanguages.join(", ")}. Returning all items.`,
    );
    return items;
  }

  return filtered;
}

/**
 * Get base URL for the application
 */
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
