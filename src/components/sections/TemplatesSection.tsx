
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTemplates } from "@/hooks/useTemplates";

const TemplatesSection = () => {
  const { data: templates, isLoading, error } = useTemplates();

  const handleWhatsAppContact = (templateName: string) => {
    const message = `Halo, saya tertarik dengan template ${templateName}. Bisa bantu saya untuk membuat undangan digital?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285700397919?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <section id="templates" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Template Pilihan Terbaik
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Loading templates...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="templates" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Template Pilihan Terbaik
            </h2>
            <p className="mt-6 text-lg leading-8 text-red-600">
              Error loading templates. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="templates" className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Template Pilihan Terbaik
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Pilih dari berbagai template cantik yang telah dirancang khusus untuk hari bahagia Anda
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {templates?.map((template) => (
                <CarouselItem key={template.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <article className="flex flex-col items-start">
                    <div className="relative w-full">
                      <img 
                        src={template.photo_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop"} 
                        alt={template.name}
                        className="aspect-[16/20] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/4]"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="max-w-xl pt-6">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {template.name}
                      </h3>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        Rp {template.price.toLocaleString('id-ID')}
                      </p>
                      <div className="mt-4 flex gap-x-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(template.previewUrl, '_blank')}
                        >
                          Live Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleWhatsAppContact(template.name)}
                        >
                          Beli Sekarang
                        </Button>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
