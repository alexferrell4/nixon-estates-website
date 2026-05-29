import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";
import slideRoom from "@/assets/slide-room.jpg";
import slideOffice from "@/assets/slide-office.jpg";
import slideLaundry from "@/assets/slide-laundry.jpg";
import nixonEmblem from "@/assets/nixon-n-emblem.png";

const slides = [
  { src: heroImage, alt: "Nixon Estate Senior Living building exterior at sunset" },
  { src: slideRoom, alt: "Spacious resident room interior" },
  { src: slideOffice, alt: "Modern office and business center" },
  { src: slideLaundry, alt: "On-site laundry facilities" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  // Door opening sequence
  useEffect(() => {
    const openTimer = setTimeout(() => setDoorsOpen(true), 4000);
    const completeTimer = setTimeout(() => setIntroComplete(true), 7000);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    if (!introComplete) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, introComplete]);

  return (
    <section className="relative h-[70vh] min-h-[400px] overflow-hidden bg-nixon-dark">
      {/* Slideshow behind the doors */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation: i === current && introComplete ? "kenburns 6s ease-in-out forwards" : "none",
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-nixon-dark/80 via-nixon-dark/10 to-nixon-dark/30" />

      {/* Door overlay - brand slide splits into two halves */}
      {!introComplete && (
        <>
          {/* Left door */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 z-30 overflow-hidden transition-transform ease-in-out"
            style={{
              transform: doorsOpen ? "translateX(-100%)" : "translateX(0)",
              transitionDuration: "2.5s",
              transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
              backgroundColor: "#1a3a2a",
            }}
          />
          {/* Right door */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 z-30 overflow-hidden transition-transform ease-in-out"
            style={{
              transform: doorsOpen ? "translateX(100%)" : "translateX(0)",
              transitionDuration: "2.5s",
              transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
              backgroundColor: "#1a3a2a",
            }}
          />
          {/* N emblem centered on doors */}
          <div
            className="absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-700"
            style={{ opacity: doorsOpen ? 0 : 1 }}
          >
            <img
              src={nixonEmblem}
              alt="Nixon N Emblem"
              className="w-32 h-32 md:w-48 md:h-48 object-contain animate-[brandReveal_3.5s_ease-out_forwards]"
            />
          </div>
          {/* Door edge shadow */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 z-30 bg-gradient-to-r from-transparent via-black/30 to-transparent transition-opacity duration-700"
            style={{ opacity: doorsOpen ? 0 : 1 }}
          />
        </>
      )}

      {/* Navigation arrows - only after intro */}
      {introComplete && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-nixon-dark/40 hover:bg-nixon-dark/70 backdrop-blur-sm text-primary-foreground p-2 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-nixon-dark/40 hover:bg-nixon-dark/70 backdrop-blur-sm text-primary-foreground p-2 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {introComplete && (
        <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-accent w-6" : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Text overlay - only on building/car slide */}
      <div className={`absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20 transition-opacity duration-700 ${
        current === 0 && introComplete ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <h1 className="font-heading text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] tracking-tight text-primary-foreground uppercase">
            COMFORT
          </h1>
          <p className="font-heading italic text-accent text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">
            & dignity
          </p>
        </div>
      </div>

      {/* Subtitle strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-nixon-dark py-4 text-center">
          <p className="text-primary-foreground/80 text-xs md:text-sm tracking-[0.3em] uppercase font-body font-light">
            Independent Living for Veterans, Special Needs & Seniors · Houston, TX
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
