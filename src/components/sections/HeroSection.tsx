
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <motion.div 
            className="lg:pr-8 lg:pt-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lg:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl select-none">
                SekapurSirih
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 select-none">
                Undangan digital personal, dibuat khusus untukmu.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-500 select-none">
                Tak perlu repot desain sendiri. Cukup kirim data, kami bantu wujudkan undangan pernikahan digital yang elegan, personal, dan siap dibagikan.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button 
                  size="lg"
                  className="select-none"
                  onClick={() => scrollToSection('pricing')}
                >
                  Mulai Sekarang
                </Button>
                <Button 
                  variant="outline" 
                  className="select-none"
                  size="lg"
                  onClick={() => scrollToSection('templates')}
                >
                  Lihat Template
                </Button>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/9c420be1-90d0-472c-b397-b6f9c29d4de8.png" 
                alt="Mockup smartphone undangan digital"
                className="w-full max-w-sm select-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
