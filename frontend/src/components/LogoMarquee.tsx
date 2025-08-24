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
            className="logoItem flex items-center justify-center flex-shrink-0 group"
            style={{ width: '120px' }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="grayscale opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              style={{ 
                maxHeight: '48px', 
                maxWidth: '100%', 
                objectFit: 'contain', 
                display: 'block' 
              }}
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load image: ${logo.src}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};