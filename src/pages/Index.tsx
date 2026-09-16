import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResidencesSection from "@/components/ResidencesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import FloorPlansSection from "@/components/FloorPlansSection";
import DemoRoomsPreviewSection from "@/components/DemoRoomsPreviewSection";
import ContactSection from "@/components/ContactSection";
import OtherServicesSection from "@/components/OtherServicesSection";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ResidencesSection />
      <AmenitiesSection />
      <FloorPlansSection />
      <DemoRoomsPreviewSection />
      <ContactSection />
      <OtherServicesSection />
      <Footer />
      <BackgroundMusic />
    </div>
  );
};

export default Index;
