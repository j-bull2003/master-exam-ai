import { LogoAsset, loadLogos } from "@/data/loadLogos";

interface LogoMarqueeProps {
  sortStrategy?: "alpha" | "original";
  className?: string;
}

export const LogoMarquee = ({ sortStrategy = "alpha", className = "" }: LogoMarqueeProps) => {
  // Auto-discover all logo assets from the logos directory
  const logos = loadLogos(sortStrategy);
  
  // Duplicate the logos array for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Reserve height to prevent layout shift when images load */}
      <div 
        className="flex animate-marquee hover:animate-marquee-paused motion-reduce:animate-none whitespace-nowrap"
        style={{ minHeight: '56px' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.filename}-${index}`}
            className="flex items-center justify-center mx-6 md:mx-8 flex-shrink-0 group"
          >
            {/* Fixed height container for consistent sizing */}
            <div className="h-14 w-20 md:w-24 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-12 max-w-full object-contain grayscale opacity-90 transition-all duration-300 group-hover:opacity-100"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};