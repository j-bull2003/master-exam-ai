import { useEffect, useState } from "react";
import cambridgeImg from "@/assets/cambridge.jpg";
import oxfordImg from "@/assets/oxford.jpg";
import harvardImg from "@/assets/harvard.jpg";
import mitImg from "@/assets/mit.jpg";

const universities = [
  { name: "Cambridge", image: cambridgeImg },
  { name: "Oxford", image: oxfordImg },
  { name: "Harvard", image: harvardImg },
  { name: "MIT", image: mitImg },
];

export const UniversityCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % universities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary-variant/5 backdrop-blur-sm border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
      
      {universities.map((university, index) => (
        <div
          key={university.name}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={university.image}
            alt={`${university.name} University`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {universities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-4 left-4 z-20">
        <span className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {universities[currentIndex].name}
        </span>
      </div>
    </div>
  );
};