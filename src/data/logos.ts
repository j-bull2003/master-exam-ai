// University logos configuration
// Easy to modify - just update this array to change logos

import cambridgeLogo from "@/assets/logos/cambridge-logo.png";
import oxfordLogo from "@/assets/logos/oxford-logo.png";
import harvardLogo from "@/assets/logos/harvard-logo.png";
import mitLogo from "@/assets/logos/mit-logo.png";
import stanfordLogo from "@/assets/logos/stanford-logo.png";
import yaleLogo from "@/assets/logos/yale-logo.png";
import princetonLogo from "@/assets/logos/princeton-logo.png";
import imperialLogo from "@/assets/logos/imperial-logo.png";

export interface UniversityLogo {
  name: string;
  logo: string;
  alt: string;
}

// Curated set of prestigious university logos
// UK institutions followed by US institutions for visual balance
export const universityLogos: UniversityLogo[] = [
  { name: "Cambridge", logo: cambridgeLogo, alt: "University of Cambridge" },
  { name: "Oxford", logo: oxfordLogo, alt: "University of Oxford" },
  { name: "Imperial", logo: imperialLogo, alt: "Imperial College London" },
  { name: "Harvard", logo: harvardLogo, alt: "Harvard University" },
  { name: "MIT", logo: mitLogo, alt: "Massachusetts Institute of Technology" },
  { name: "Stanford", logo: stanfordLogo, alt: "Stanford University" },
  { name: "Princeton", logo: princetonLogo, alt: "Princeton University" },
  { name: "Yale", logo: yaleLogo, alt: "Yale University" },
];