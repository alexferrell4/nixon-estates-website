import { Home, Shield, Users, Utensils, Car, Wifi } from "lucide-react";

const amenities = [
  { icon: Home, title: "Private Living Suites", desc: "Spacious units with kitchenette and full bath" },
  { icon: Shield, title: "Veteran-Friendly", desc: "Honoring those who served our country" },
  { icon: Users, title: "Community Spaces", desc: "Lounge, dining, and social gathering areas" },
  { icon: Utensils, title: "On-Site Laundry", desc: "Convenient laundry facilities for all residents" },
  { icon: Car, title: " Parking", desc: "Safe, accessible parking for residents and guests" },
  { icon: Wifi, title: "Modern Amenities", desc: "Elevator access, office area, and more" },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Lifestyle</p>
          <h2 className="heading-section text-foreground mb-6">
            Everything You Need
          </h2>
          <div className="gold-divider mb-8" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-xl bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <item.icon className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
