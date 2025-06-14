
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah & Budi",
    content: "KitaMenikah membuat proses pembuatan undangan jadi sangat mudah! Template-nya cantik dan fitur personalisasinya lengkap sekali.",
    rating: 5
  },
  {
    name: "Dewi & Agus",
    content: "Tamu-tamu kami sangat terkesan dengan undangan digitalnya. Musik dan galeri fotonya benar-benar membuat undangan jadi hidup!",
    rating: 5
  },
  {
    name: "Maya & Rizky",
    content: "Pelayanannya excellent dan hasilnya melebihi ekspektasi. Highly recommended untuk calon pengantin!",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kata Mereka Tentang KitaMenikah
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ribuan pasangan telah mempercayakan momen bahagia mereka kepada kami
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
