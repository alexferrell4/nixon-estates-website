import roomImage from "@/assets/room-interior.jpg";
import loungeImage from "@/assets/amenities-lounge.jpg";

const ResidencesSection = () => {
  return (
    <section id="residences" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Residences</p>
          <h2 className="heading-section text-primary-foreground mb-6">
            Thoughtfully Designed Living
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-body-lg text-primary-foreground/70 max-w-3xl mx-auto">
            Each residence features a private kitchenette, full bathroom, and generous living space —
            everything you need for comfortable, independent living.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group overflow-hidden rounded-lg">
            <div className="relative overflow-hidden">
              <img
                src={roomImage}
                alt="Spacious private bedroom"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={1280}
                height={854}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nixon-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-heading text-2xl text-primary-foreground">Private Suites</h3>
                <p className="text-primary-foreground/70 text-sm font-body mt-1">
                  Kitchenette · Bathroom · Living Area
                </p>
              </div>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg">
            <div className="relative overflow-hidden">
              <img
                src={loungeImage}
                alt="Community lounge area"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={1280}
                height={854}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nixon-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-heading text-2xl text-primary-foreground">Community Spaces</h3>
                <p className="text-primary-foreground/70 text-sm font-body mt-1">
                  Lounge · Office · Laundry · Lobby
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Private Kitchenette", desc: "Prepare light meals in your own space" },
            { title: "Full Bathroom", desc: "Accessible design with modern fixtures" },
            { title: "Balcony Access", desc: "Select units with private balconies" },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-6 border border-primary-foreground/10 rounded-lg">
              <h4 className="font-heading text-lg text-accent mb-2">{feature.title}</h4>
              <p className="text-primary-foreground/60 text-sm font-body">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResidencesSection;
