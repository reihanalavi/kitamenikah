
import { Button } from "@/components/ui/button";

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
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                KitaMenikah
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Platform terdepan untuk membuat undangan pernikahan digital yang personal dan berkesan
              </p>
              <p className="mt-4 text-base leading-7 text-gray-500">
                Buat website undangan pernikahan impian Anda dengan mudah. Pilih template favorit, 
                personalisasi sesuai keinginan, dan bagikan kepada orang terkasih.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button size="lg">
                  Mulai Sekarang
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('templates')}
                >
                  Lihat Template
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=800&fit=crop" 
                alt="Mockup smartphone undangan digital"
                className="w-full max-w-sm rounded-2xl bg-gray-900/5 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
