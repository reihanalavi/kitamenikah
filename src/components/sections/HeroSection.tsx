
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              KitaMenikah
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Platform terdepan untuk membuat undangan pernikahan digital yang personal dan berkesan
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Buat website undangan pernikahan impian Anda dengan mudah. Pilih template favorit, 
              personalisasi sesuai keinginan, dan bagikan kepada orang terkasih.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-3">
                Mulai Sekarang
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Lihat Template
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=800&fit=crop" 
              alt="Mockup smartphone undangan digital"
              className="rounded-3xl shadow-2xl max-w-sm w-full"
            />
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rounded-full opacity-80"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
