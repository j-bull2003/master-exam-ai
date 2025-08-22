import cambridgeLogo from "@/assets/logos/cambridge-logo.png";
import oxfordLogo from "@/assets/logos/oxford-logo.png";
import harvardLogo from "@/assets/logos/harvard-logo.png";
import mitLogo from "@/assets/logos/mit-logo.png";
import stanfordLogo from "@/assets/logos/stanford-logo.png";
import yaleLogo from "@/assets/logos/yale-logo.png";
import princetonLogo from "@/assets/logos/princeton-logo.png";
import imperialLogo from "@/assets/logos/imperial-logo.png";

const universities = [
  { name: "Cambridge", logo: cambridgeLogo },
  { name: "Oxford", logo: oxfordLogo },
  { name: "Harvard", logo: harvardLogo },
  { name: "MIT", logo: mitLogo },
  { name: "Stanford", logo: stanfordLogo },
  { name: "Yale", logo: yaleLogo },
  { name: "Princeton", logo: princetonLogo },
  { name: "Imperial", logo: imperialLogo },
];

export const UniversityLogosCarousel = () => {
  // Duplicate the array for seamless looping
  const duplicatedUniversities = [...universities, ...universities];

  return (
    <div className="w-full overflow-hidden bg-muted/30 py-8">
      <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap">
        {duplicatedUniversities.map((university, index) => (
          <div
            key={`${university.name}-${index}`}
            className="flex items-center justify-center mx-8 flex-shrink-0"
          >
            <img
              src={university.logo}
              alt={`${university.name} University`}
              className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};