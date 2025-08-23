// Auto-discover and load all university logos from assets folder
// No manual maintenance required - automatically finds all logo files

export interface LogoAsset {
  src: string;
  alt: string;
  filename: string;
}

type SortStrategy = "alpha" | "original";

/**
 * Converts filename to Title Case alt text
 * Example: "university-of-oxford.png" → "University Of Oxford"
 * Example: "cambridge-logo.png" → "Cambridge Logo"
 */
function filenameToAlt(filename: string): string {
  return filename
    .replace(/\.(png|svg|webp|jpg|jpeg)$/i, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) // Title case
    .replace(/\bLogo\b/g, 'University') // Replace "Logo" with "University" for better accessibility
    .trim();
}

/**
 * Load all logo assets from the logos directory
 * Uses Vite's import.meta.glob for automatic asset discovery
 */
export function loadLogos(sortStrategy: SortStrategy = "alpha"): LogoAsset[] {
  // Auto-discover all image files in the logos directory
  const logoModules = import.meta.glob('/src/assets/logos/*.{png,svg,webp,jpg,jpeg}', {
    eager: true,
    as: 'url'
  });

  // Convert to LogoAsset array
  const logos: LogoAsset[] = Object.entries(logoModules).map(([path, src]) => {
    const filename = path.split('/').pop() || '';
    return {
      src: src as string,
      alt: filenameToAlt(filename),
      filename
    };
  });

  // Apply sort strategy
  if (sortStrategy === "alpha") {
    logos.sort((a, b) => a.filename.localeCompare(b.filename));
  }
  // "original" keeps file system order (no sorting needed)

  return logos;
}
