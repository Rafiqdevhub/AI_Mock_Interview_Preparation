import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for combining Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Constants for tech icon fetching
const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const FALLBACK_ICON = "/tech.svg";

// Cache for icon existence checks to reduce network requests
const iconExistenceCache = new Map<string, boolean>();

/**
 * Normalize technology name to match icon naming conventions
 */
const normalizeTechName = (tech: string): string => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings] || key;
};

/**
 * Check if an icon URL exists, with caching to reduce network requests
 */
const checkIconExists = async (url: string): Promise<boolean> => {
  // Return cached result if available
  if (iconExistenceCache.has(url)) {
    return iconExistenceCache.get(url) as boolean;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const exists = response.ok;

    // Cache the result
    iconExistenceCache.set(url, exists);
    return exists;
  } catch {
    // Cache the failure
    iconExistenceCache.set(url, false);
    return false;
  }
};

/**
 * Get technology logos for an array of tech stack names
 */
export const getTechLogos = async (techArray: string[] = []) => {
  // Handle empty tech array
  if (!techArray.length) return [];

  // Deduplicate tech array to avoid redundant fetches
  const uniqueTechs = [...new Set(techArray)];

  // Create URL mappings
  const logoURLs = uniqueTechs.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: normalized
        ? `${techIconBaseURL}/${normalized}/${normalized}-original.svg`
        : FALLBACK_ICON,
    };
  });

  // Check URL existence in parallel
  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url:
        url !== FALLBACK_ICON && (await checkIconExists(url))
          ? url
          : FALLBACK_ICON,
    }))
  );

  return results;
};

/**
 * Get a random interview cover image path
 */
export const getRandomInterviewCover = (): string => {
  if (!interviewCovers.length) return "/covers/default.png";

  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
