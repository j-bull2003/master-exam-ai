import { universityLogos } from "@/data/universityLogos";

interface LogoMarqueeProps {
  className?: string;
}

export const LogoMarquee = ({ className = "" }: LogoMarqueeProps) => {
  // Duplicate the logos array for seamless infinite scroll
  const duplicatedLogos = [...universityLogos, ...universityLogos];

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Reserve height to prevent layout shift when images load */}
      <div 
        className="flex animate-marquee hover:animate-marquee-paused motion-reduce:animate-none whitespace-nowrap"
        style={{ minHeight: '56px' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex items-center justify-center mx-6 md:mx-8 flex-shrink-0 group"
          >
            {/* Fixed height container for consistent sizing */}
            <div className="h-12 w-16 md:h-14 md:w-20 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto md:h-12 md:w-auto max-w-full object-contain grayscale opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${logo.src}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};