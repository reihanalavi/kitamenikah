
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent leading-tight">
              KitaMenikah
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Platform terdepan untuk membuat undangan pernikahan digital yang personal dan berkesan
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Buat website undangan pernikahan impian Anda dengan mudah. Pilih template favorit, 
              personalisasi sesuai keinginan, dan bagikan kepada orang terkasih.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg">
                Mulai Sekarang
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg"
                onClick={() => scrollToSection('templates')}
              >
                Lihat Template
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-3xl blur-2xl opacity-20 scale-110"></div>
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=800&fit=crop" 
              alt="Mockup smartphone undangan digital"
              className="relative rounded-3xl shadow-2xl max-w-sm w-full border-4 border-white"
            />
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-80"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
