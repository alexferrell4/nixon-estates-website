import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll be in touch shortly.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Get In Touch</p>
          <h2 className="heading-section text-primary-foreground mb-6">
            Schedule a Visit
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-body-lg text-primary-foreground/70 max-w-2xl mx-auto">
            We'd love for you to learn more about Nixon Estate Senior Living.
            Contact us today to schedule a tour or request more information.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-primary-foreground/80 text-sm font-body mb-1.5">
                  Full Name <span className="text-accent">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-primary-foreground/80 text-sm font-body mb-1.5">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(xxx) xxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={20}
                  className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-primary-foreground/80 text-sm font-body mb-1.5">
                Email Address <span className="text-accent">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                maxLength={255}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-primary-foreground/80 text-sm font-body mb-1.5">
                Message <span className="text-accent">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your needs, ask questions, or request a tour..."
                value={formData.message}
                onChange={handleChange}
                maxLength={1000}
                rows={5}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-base tracking-wide py-6"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          {/* Contact Info Cards */}
          <div className="space-y-6 order-1 lg:order-2">
            <a
              href="tel:7134192653"
              className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10 hover:border-accent/40 transition-colors group"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Call Us</h3>
                <p className="text-primary-foreground/60 text-sm font-body">(713) 419-2653</p>
              </div>
            </a>

            <a
              href="mailto:nixon_homecare@msn.com"
              className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10 hover:border-accent/40 transition-colors group"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Email Us</h3>
                <p className="text-primary-foreground/60 text-sm font-body">nixon_homecare@msn.com</p>
              </div>
            </a>

            <div className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Location</h3>
                <p className="text-primary-foreground/60 text-sm font-body">Houston, TX Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
