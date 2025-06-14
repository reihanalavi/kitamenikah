
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Template Pilihan Terbaik
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih dari berbagai template cantik yang telah dirancang khusus untuk hari bahagia Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-2xl font-bold text-pink-600 mb-4">{template.price}</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Live Preview
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Beli Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
