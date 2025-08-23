import { UniversityLogo } from "@/data/logos";

interface LogoMarqueeProps {
  logos: UniversityLogo[];
  className?: string;
}

export const LogoMarquee = ({ logos, className = "" }: LogoMarqueeProps) => {
  // Duplicate the logos array for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Pause animation on hover and respect prefers-reduced-motion */}
      <div className="flex animate-marquee hover:animate-marquee-paused motion-reduce:animate-none whitespace-nowrap">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center mx-8 md:mx-12 flex-shrink-0 group"
          >
            <div className="h-12 w-20 md:h-14 md:w-24 flex items-center justify-center">
              <img
                src={logo.logo}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};