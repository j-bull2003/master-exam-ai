export interface UniversityLogo {
  src: string;
  alt: string;
}

export const UNI_LOGOS: UniversityLogo[] = [
  { src: "/uni-logos/mit.png", alt: "Massachusetts Institute of Technology" },
  { src: "/uni-logos/harvard.png", alt: "Harvard University" },
  { src: "/uni-logos/stanford.png", alt: "Stanford University" },
  { src: "/uni-logos/princeton.png", alt: "Princeton University" },
  { src: "/uni-logos/cambridge.png", alt: "University of Cambridge" },
  { src: "/uni-logos/oxford.png", alt: "University of Oxford" },
  { src: "/uni-logos/cornell.png", alt: "Cornell University" },
  { src: "/uni-logos/upenn.png", alt: "University of Pennsylvania" },
  { src: "/uni-logos/imperial.png", alt: "Imperial College London" },
  { src: "/uni-logos/lse.png", alt: "London School of Economics" },
];

// For backward compatibility
export const universityLogos = UNI_LOGOS;