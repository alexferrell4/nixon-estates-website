import coverVideo from "@/assets/cover.mp4";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Welcome Home</p>
          <h2 className="heading-section text-foreground mb-6">
            Style, Comfort, Care & Community
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Nixon Senior Estates brings style, comfort, care and community to our Seniors
            within the Houston Area. Our new 17-unit independent living facility is designed
            for Veterans, People with Special Needs and Seniors who deserve a home that honors their service and
            celebrates their independence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
          
              <video autoPlay muted loop playsInline>
  <source src={coverVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>
    
          </div>
          <div className="space-y-6">
            <h3 className="font-heading text-2xl text-foreground">A Home Away From Home</h3>
            <p className="text-body-lg text-muted-foreground">
              Every detail of Nixon Senior Estates has been thoughtfully designed to provide
              a warm, welcoming environment where residents can thrive. From spacious living areas
              to shared community spaces, we've created a place where comfort meets connection.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { number: "17", label: "Private Units" },
                { number: "3", label: "Floors" },
                { number: "✓", label: "Senior Living" },
                { number: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-secondary rounded-lg">
                  <p className="font-heading text-3xl text-primary">{stat.number}</p>
                  <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
