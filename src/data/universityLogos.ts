export interface UniversityLogo {
  src: string;
  alt: string;
}

export const UNI_LOGOS: UniversityLogo[] = [
  { src: "/lovable-uploads/acd43a68-42cc-4781-8dc2-f677dd6675e2.png", alt: "Massachusetts Institute of Technology" },
  { src: "/lovable-uploads/14f9398d-1ef4-4b74-b650-684a4e6ce4d2.png", alt: "Harvard University" },
  { src: "/lovable-uploads/3a535299-2c20-4dc9-a443-a5b0e448a8cb.png", alt: "Stanford University" },
  { src: "/lovable-uploads/6d84758f-c897-44ef-8ec1-ad02ea3123ad.png", alt: "Princeton University" },
  { src: "/lovable-uploads/c1b76712-b140-4a13-9c7c-09666486608a.png", alt: "Cornell University" },
  { src: "/lovable-uploads/91e00bbb-fe7c-414b-a1e5-75c533b51e80.png", alt: "University of Pennsylvania" },
];

// For backward compatibility
export const universityLogos = UNI_LOGOS;