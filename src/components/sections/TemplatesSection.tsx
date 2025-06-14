
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    id: 1,
    name: "Elegant Rose",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop",
    price: "Rp 299.000"
  },
  {
    id: 2,
    name: "Modern Minimalist",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=400&fit=crop",
    price: "Rp 199.000"
  },
  {
    id: 3,
    name: "Classic Vintage",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop",
    price: "Rp 249.000"
  },
  {
    id: 4,
    name: "Tropical Garden",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=400&fit=crop",
    price: "Rp 199.000"
  }
];

const TemplatesSection = () => {
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

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {templates.map((template) => (
            <article key={template.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="aspect-[16/20] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/4]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl pt-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">{template.price}</p>
                <div className="mt-4 flex gap-x-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    Live Preview
                  </Button>
                  <Button size="sm" className="flex-1">
                    Beli Sekarang
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
