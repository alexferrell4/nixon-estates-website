import { useState } from "react";
import { Expand, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSectionLink } from "@/hooks/use-section-link";

import constructionExterior from "@/assets/demo/construction-exterior.jpg";
import modelBedroom from "@/assets/demo/model-bedroom.jpg";
import modelBedroomA from "@/assets/demo/model-bedroom-corner-a.jpg";
import modelBedroomB from "@/assets/demo/model-bedroom-corner-b.jpg";
import modelBedroomC from "@/assets/demo/model-bedroom-corner-c.jpg";
import modelBedroomD from "@/assets/demo/model-bedroom-corner-d.jpg";
import modelBedroomE from "@/assets/demo/model-bedroom-corner-e.jpg";
import modelBedroomF from "@/assets/demo/model-bedroom-corner-f.jpg";
import modelDecorDetail from "@/assets/demo/model-decor-detail.jpg";
import modelKitchenette from "@/assets/demo/model-kitchenette.jpg";
import modelKitchenetteWide from "@/assets/demo/model-kitchenette-wide.jpg";
import modelKitchenetteDetail from "@/assets/demo/model-kitchenette-detail.jpg";
import modelBathroom from "@/assets/demo/model-bathroom.jpg";
import modelBathroomWide from "@/assets/demo/model-bathroom-wide.jpg";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryGroup {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

const groups: GalleryGroup[] = [
  {
    id: "construction",
    title: "Construction Progress",
    description: "A current look at the building as it nears completion.",
    images: [{ src: constructionExterior, alt: "Building exterior — current construction progress" }],
  },
  {
    id: "bedroom",
    title: "Bedroom Suite",
    description: "Private bedrooms with generous closet space and tasteful, comfortable furnishings.",
    images: [
      { src: modelBedroom, alt: "Furnished model suite bedroom with twin bed" },
      { src: modelBedroomA, alt: "Bedroom dresser and arched mirror" },
      { src: modelBedroomB, alt: "Bedroom corner with entry door and wall art" },
      { src: modelBedroomC, alt: "Bedroom nightstand and lamp" },
      { src: modelBedroomD, alt: "Bedroom entry with framed art" },
      { src: modelBedroomE, alt: "Bedroom dresser with decorative accents" },
      { src: modelBedroomF, alt: "Bedroom with twin bed, dresser, and arched mirror" },
      { src: modelDecorDetail, alt: "Framed botanical art detail near window" },
    ],
  },
  {
    id: "kitchenette",
    title: "Private Kitchenette",
    description: "Every suite includes its own kitchenette — sink, cooktop, microwave, and refrigerator.",
    images: [
      { src: modelKitchenette, alt: "Model suite kitchenette with white cabinetry" },
      { src: modelKitchenetteWide, alt: "Wide view of kitchenette and entry door" },
      { src: modelKitchenetteDetail, alt: "Close view of kitchenette sink and cooktop" },
    ],
  },
  {
    id: "bathroom",
    title: "Accessible Bathroom",
    description: "Thoughtfully designed, accessible bathrooms with modern fixtures.",
    images: [
      { src: modelBathroom, alt: "Model suite bathroom with walk-in shower" },
      { src: modelBathroomWide, alt: "Wide view of bathroom vanity and mirror" },
    ],
  },
];

const DemoRooms = () => {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const goToSection = useSectionLink();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <a
            href="/#contact"
            onClick={goToSection("contact")}
            className="inline-flex items-center gap-2 bg-accent text-nixon-dark font-heading text-xs md:text-sm tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-lg hover:bg-accent/90 transition-colors mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-nixon-dark animate-pulse" />
            Now Leasing · Schedule a Tour
          </a>
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Gallery</p>
          <h1 className="heading-section text-primary-foreground mb-6">
            Inside Nixon Signature Estates
          </h1>
          <div className="gold-divider mb-8 mx-auto" />
          <p className="text-body-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Real, unedited photos of our furnished model suite and current construction progress —
            so you know exactly what to expect when you move in.
          </p>
        </div>
      </section>

      {/* Gallery groups */}
      {groups.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          className={`section-padding ${i % 2 === 0 ? "bg-background" : "bg-secondary"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="font-heading text-3xl text-foreground mb-2">{group.title}</h2>
              <p className="text-muted-foreground font-body">{group.description}</p>
            </div>
            <div
              className={`grid gap-4 md:gap-6 ${
                group.images.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {group.images.map((img) => (
                <button
                  key={img.src}
                  onClick={() => setLightbox(img)}
                  className={`group relative overflow-hidden rounded-xl block text-left ${
                    group.images.length === 1 ? "aspect-video max-h-[520px] mx-auto w-full" : "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-nixon-dark/0 group-hover:bg-nixon-dark/30 transition-colors flex items-center justify-center">
                    <Expand className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="section-padding bg-primary">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="heading-section text-primary-foreground mb-6">
            Like What You See?
          </h2>
          <p className="text-body-lg text-primary-foreground/70 mb-10">
            Suites are filling up. Schedule a tour or start your leasing application today
            and see Nixon Signature Estates in person.
          </p>
          <a
            href="/#contact"
            onClick={goToSection("contact")}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-nixon-dark font-heading text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors"
          >
            Apply For Leasing Today
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-2 bg-nixon-dark border-none">
          <DialogTitle className="sr-only">{lightbox?.alt}</DialogTitle>
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg mx-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoRooms;
