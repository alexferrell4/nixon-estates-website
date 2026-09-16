import { Phone, Mail, MapPin, Send, Instagram, XIcon, Facebook, Linkedin, CalendarCheck, ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://form.jotform.com/jsform/261674838852067";
    script.type = "text/javascript";
    document.getElementById("jotform-container")?.appendChild(script);
  }, []);

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
          <span className="inline-flex items-center gap-2 bg-accent text-nixon-dark font-heading text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-nixon-dark animate-pulse" />
            Now Leasing · Suites Available
          </span>
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">Get In Touch</p>
          <h2 className="heading-section text-primary-foreground mb-6">
            Schedule a Tour or Start Your Application
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-body-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Nixon Signature Estates is now leasing a limited number of suites to Veterans,
            People with Special Needs, and Seniors. Reach out today to schedule a tour,
            start your leasing application, or ask a question — we'll walk you through every step.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {[
            { icon: Phone, step: "1. Inquire", desc: "Call, email, or submit the form below to tell us about your housing needs." },
            { icon: CalendarCheck, step: "2. Tour", desc: "We'll schedule a visit so you can see a model suite in person." },
            { icon: ClipboardList, step: "3. Apply", desc: "Complete a leasing application and our team will guide you to move-in." },
          ].map((item) => (
            <div key={item.step} className="text-center p-6 rounded-xl border border-primary-foreground/10">
              <item.icon className="h-6 w-6 text-accent mx-auto mb-3" />
              <h3 className="font-heading text-sm text-primary-foreground tracking-wide uppercase mb-2">{item.step}</h3>
              <p className="text-primary-foreground/60 text-xs font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 order-2 lg:order-1">

            <div id="jotform-container"></div>

        
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
                <p className="text-primary-foreground/60 text-sm font-body">
                  nixon_homecare@msn.com or info@nixonhomecare.org
                </p>
              </div>
            </a>

             <div className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-accent" />
              </div> 
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Follow us on Instagram</h3>
                <p className="text-primary-foreground/60 text-sm font-body"> @nixonsignatureestates </p>
              </div>
            </div>

             <div className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <XIcon className="h-6 w-6 text-accent" />
              </div> 
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Follow us on X</h3>
                <p className="text-primary-foreground/60 text-sm font-body"> @nixon_estates</p>
              </div>
            </div>

             <div className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Facebook className="h-6 w-6 text-accent" />
              </div> 
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Follow us on Facebook</h3>
                <p className="text-primary-foreground/60 text-sm font-body"> @Nixon Estates</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Linkedin className="h-6 w-6 text-accent" />
              </div> 
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Follow us on LinkedIn</h3>
                <p className="text-primary-foreground/60 text-sm font-body"> @Nixon Senior Estates</p>
              </div>
            </div>

            

            <div className="flex items-center gap-5 p-6 rounded-xl border border-primary-foreground/10">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-foreground mb-0.5">Location</h3>
                <p className="text-primary-foreground/60 text-sm font-body">Greater Houston Area</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;