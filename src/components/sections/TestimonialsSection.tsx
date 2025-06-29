
import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-red-600">Error loading testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate testimonials to create seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <motion.section 
      className="py-24 sm:py-32 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-slate-600">Testimoni</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Apa Kata Mereka Setelah Lihat Preview Kami?
          </p>
        </motion.div>
        
        <div className="mt-16 relative">
          <div className="flex overflow-hidden w-full">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -100 * testimonials.length + '%']
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: testimonials.length * 8,
                  ease: "linear",
                },
              }}
              style={{ width: `${duplicatedTestimonials.length * 400}px` }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-96">
                  <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6 h-full">
                    <blockquote className="text-gray-900">
                      <p>"{testimonial.message}"</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="flex mt-2">
                          {[...Array(testimonial['rating-star'])].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
