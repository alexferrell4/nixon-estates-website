import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResidencesSection from "@/components/ResidencesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import FloorPlansSection from "@/components/FloorPlansSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ResidencesSection />
      <AmenitiesSection />
      <FloorPlansSection />
      <ContactSection />
      <Footer />
      <BackgroundMusic />
      <Chatbot />
    </div>
  );
};

export default Index;
