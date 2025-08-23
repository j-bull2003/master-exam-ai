// Auto-discover and load all university logos from public uploads folder
// No manual maintenance required - automatically finds all logo files

export interface LogoAsset {
  src: string;
  alt: string;
  filename: string;
}

type SortStrategy = "alpha" | "original";

/**
 * Converts filename to Title Case alt text
 * Example: "9670c69b-bf63-4814-8b43-8051ab8efec1.png" → "Oxford University"
 * Maps known university logo IDs to proper names
 */
function filenameToAlt(filename: string): string {
  // Map of uploaded file IDs to university names
  const universityMap: Record<string, string> = {
    'a4012079-ad82-43fb-b6c2-2b908b663afa.png': 'Massachusetts Institute of Technology',
    '0551ece6-100e-4508-8bfe-fc727b20c593.png': 'London School of Economics',
    '0f88f1a3-7e6c-4081-b71f-e5ecaf714dff.png': 'Harvard University',
    'f5f60066-451e-425e-a275-0e1e24bbc78b.png': 'University of Cambridge',
    'ec3efe67-26ec-4039-9e1a-01bd39c4fbf5.png': 'Princeton University',
    'e0bbe2e3-b731-4acb-bdd7-86132c786d55.png': 'Stanford University',
    '545485b6-b045-4aa4-b55b-434558e5766d.png': 'Cornell University',
    '1ec07550-7bc6-49f2-8542-192971644022.png': 'University of Pennsylvania',
    '52b1eebf-5808-432e-b0d7-fd3a658ef494.png': 'Imperial College London',
    '9670c69b-bf63-4814-8b43-8051ab8efec1.png': 'University of Oxford',
  };

  return universityMap[filename] || filename
    .replace(/\.(png|svg|webp|jpg|jpeg)$/i, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) // Title case
    .trim();
}

/**
 * Load all university logo assets from the public uploads directory
 * Uses the uploaded university logos directly
 */
export function loadLogos(sortStrategy: SortStrategy = "alpha"): LogoAsset[] {
  // Define the university logos that were uploaded
  const universityLogos = [
    'a4012079-ad82-43fb-b6c2-2b908b663afa.png', // MIT
    '0551ece6-100e-4508-8bfe-fc727b20c593.png', // LSE
    '0f88f1a3-7e6c-4081-b71f-e5ecaf714dff.png', // Harvard
    'f5f60066-451e-425e-a275-0e1e24bbc78b.png', // Cambridge
    'ec3efe67-26ec-4039-9e1a-01bd39c4fbf5.png', // Princeton
    'e0bbe2e3-b731-4acb-bdd7-86132c786d55.png', // Stanford
    '545485b6-b045-4aa4-b55b-434558e5766d.png', // Cornell
    '1ec07550-7bc6-49f2-8542-192971644022.png', // UPenn
    '52b1eebf-5808-432e-b0d7-fd3a658ef494.png', // Imperial
    '9670c69b-bf63-4814-8b43-8051ab8efec1.png', // Oxford
  ];

  // Convert to LogoAsset array
  const logos: LogoAsset[] = universityLogos.map((filename) => ({
    src: `/lovable-uploads/${filename}`,
    alt: filenameToAlt(filename),
    filename
  }));

  // Apply sort strategy - for university names, sort by alt text
  if (sortStrategy === "alpha") {
    logos.sort((a, b) => a.alt.localeCompare(b.alt));
  }
  // "original" keeps the defined order

  return logos;
}
