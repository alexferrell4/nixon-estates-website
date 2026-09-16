import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import modelBedroom from "@/assets/demo/model-bedroom.jpg";
import modelKitchenette from "@/assets/demo/model-kitchenette.jpg";
import modelBathroom from "@/assets/demo/model-bathroom.jpg";
import constructionExterior from "@/assets/demo/construction-exterior.jpg";

const previewImages = [
  { src: modelBedroom, alt: "Furnished model suite bedroom", label: "Bedroom Suite" },
  { src: modelKitchenette, alt: "Private in-suite kitchenette", label: "Kitchenette" },
  { src: modelBathroom, alt: "Accessible model suite bathroom", label: "Bathroom" },
  { src: constructionExterior, alt: "Construction progress on the building exterior", label: "Construction Progress" },
];

const DemoRoomsPreviewSection = () => {
  return (
    <section id="demo-rooms-preview" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">See It For Yourself</p>
          <h2 className="heading-section text-foreground mb-6">Step Inside a Model Suite</h2>
          <div className="gold-divider mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Real photos from our furnished model suite and current construction progress —
            no stock photos, just what you'll actually find at Nixon Signature Estates.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {previewImages.map((img) => (
            <Link
              key={img.label}
              to="/demo-rooms"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nixon-dark/80 via-nixon-dark/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary-foreground font-heading text-sm md:text-base">{img.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/demo-rooms"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DemoRoomsPreviewSection;
