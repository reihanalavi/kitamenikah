
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
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-slate-600">Testimoni</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kata Mereka Tentang KitaMenikah
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-1 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>"{testimonial.content}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
