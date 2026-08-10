import React from "react";
import MusicPlayer from "../components/MusicPlayer";

// Formation: 3 - 2 - 1 - 2 - 3 (tier distance from center)
// Tier 1 (center): fixed width, ~50% taller than it is wide
// Tier 2: square (1:1), same width as center
// Tier 3: square (1:1), same ratio as tier 2 but smaller overall
const images = [
  { src: "/images/hero-10.jpg", tier: 3 },
  { src: "/images/hero-12.jpg", tier: 2 },
  { src: "/images/hero-9.jpg", tier: 1 },
  { src: "/images/hero-14.jpg", tier: 2 },
  { src: "/images/hero-11.jpg", tier: 3 },
];

const getDimensions = (tier: number) => {
  if (tier === 1)
    return {
      width: "var(--unit)",
      height: "calc(var(--unit) * 1.5)",
    };
  if (tier === 2) return { width: "var(--unit)", height: "var(--unit)" };
  return {
    width: "calc(var(--unit) * 0.7)",
    height: "calc(var(--unit) * 0.7)",
  };
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center ray-olsen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 text-center">
        {/* Greeting */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] text-[#1B1B18]">
          Hi there!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#1B1B18] leading-relaxed max-w-lg mx-auto ray-olsen mt-2">
          I'm a Full Stack Web &amp; Game Developer
        </p>
                <p className="text-sm sm:text-base md:text-lg text-[#1B1B18] leading-relaxed max-w-lg mx-auto ray-olsen">
          Inprocess to expand my domain with Cybersecurity too.
        </p>

        {/* Formation row — floats on the center image's vertical axis */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-10 md:mt-14 mb-10 md:mb-14 [--unit:52px] xs:[--unit:60px] sm:[--unit:85px] md:[--unit:135px] lg:[--unit:200px]">
          {images.map((img, i) => {
            const { width, height } = getDimensions(img.tier);
            return (
              <div
                key={img.src}
                className="shrink-0 overflow-hidden bg-[#EFEDE6] transition-transform duration-500 hover:-translate-y-1"
                style={{ width, height }}
              >
                <img
                  src={img.src}
                  alt={`Project preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Description */}

        <p>
          In the meantime <br />Here listen to my Jam! I know it's better than yours :)
        </p>
        <div className="mt-8 flex justify-center">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default Index;
