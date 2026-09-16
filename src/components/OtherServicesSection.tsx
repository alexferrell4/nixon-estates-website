import { Sun, Home, HeartHandshake, MessageCircle, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Nixon Adult Day Care",
    desc: "Daytime care, supervision, and engaging activities for adults who need support while family members work or rest.",
    href: "https://nixonhomecare.org",
  },
  {
    icon: Home,
    title: "Nixon Independent Living",
    desc: "Private, self-sufficient living arrangements for seniors and adults who want their own space with support close by.",
    href: "https://nixonhomecare.org",
  },
  {
    icon: HeartHandshake,
    title: "Nixon Assisted Living",
    desc: "Personalized daily care and assistance for residents who need a helping hand while maintaining their independence.",
    href: "https://nixonhomecare.org",
  },
  {
    icon: MessageCircle,
    title: "Nixon Counseling Services",
    desc: "Compassionate counseling and mental health support for individuals and families in the Houston community.",
    href: "https://nixoncounselingservices.org",
  },
];

const OtherServicesSection = () => {
  return (
    <section id="other-services" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Beyond Nixon Signature Estates</p>
          <h2 className="heading-section text-foreground mb-6">More Ways Nixon Serves Our Community</h2>
          <div className="gold-divider mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Nixon Signature Estates is part of the Nixon Home Care family, which offers a full range
            of care services across the Houston area.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-8 rounded-xl bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <service.icon className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-lg text-foreground mb-2 flex items-center gap-1.5">
                {service.title}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{service.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServicesSection;
