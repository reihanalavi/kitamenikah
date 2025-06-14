
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TemplatesSection from "@/components/sections/TemplatesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <TestimonialsSection />
        <FAQSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
