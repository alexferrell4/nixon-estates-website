import { useState } from "react";
import firstFloor from "@/assets/first-floor.jpg";
import secondThirdFloor from "@/assets/second-third-floor.jpg";

const FloorPlansSection = () => {
  const [activeFloor, setActiveFloor] = useState<"first" | "upper">("first");

  return (
    <section id="floor-plans" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Layout</p>
          <h2 className="heading-section text-foreground mb-6">Floor Plans</h2>
          <div className="gold-divider mb-8" />
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveFloor("first")}
            className={`px-6 py-3 rounded-lg font-body text-sm tracking-wide uppercase transition-colors ${
              activeFloor === "first"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-primary/10"
            }`}
          >
            First Floor
          </button>
          <button
            onClick={() => setActiveFloor("upper")}
            className={`px-6 py-3 rounded-lg font-body text-sm tracking-wide uppercase transition-colors ${
              activeFloor === "upper"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-primary/10"
            }`}
          >
            Second & Third Floor
          </button>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 md:p-10">
          <img
            src={activeFloor === "first" ? firstFloor : secondThirdFloor}
            alt={activeFloor === "first" ? "First floor layout" : "Second and third floor layout"}
            className="w-full max-w-4xl mx-auto"
            loading="lazy"
          />
          <p className="text-center text-muted-foreground text-sm font-body mt-6">
            {activeFloor === "first"
              ? "First Floor — Living areas, kitchenettes, lobby, office, and laundry"
              : "Second & Third Floors — Private bedrooms with bathrooms, balconies, elevator access"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FloorPlansSection;
