
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TemplatesSection from "@/components/sections/TemplatesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <TestimonialsSection />
      <FAQSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
