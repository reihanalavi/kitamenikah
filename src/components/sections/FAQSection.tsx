
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Berapa lama waktu yang dibutuhkan untuk membuat undangan?",
    answer: "Setelah pembelian template dan pengisian data, undangan Anda akan siap dalam 1-2 hari kerja. Untuk revisi, kami memberikan waktu hingga 3x revisi gratis."
  },
  {
    question: "Apakah bisa menambahkan musik sendiri?",
    answer: "Ya, Anda bisa mengunggah file musik favorit Anda dalam format MP3. Kami juga menyediakan koleksi musik romantis yang bisa dipilih."
  },
  {
    question: "Bagaimana cara membagikan undangan kepada tamu?",
    answer: "Undangan digital akan tersedia dalam bentuk link website yang bisa dibagikan melalui WhatsApp, email, atau media sosial lainnya."
  },
  {
    question: "Apakah ada batasan jumlah tamu?",
    answer: "Tidak ada batasan jumlah tamu. Anda bisa mengundang sebanyak mungkin orang dengan satu undangan digital."
  },
  {
    question: "Bisakah mengedit undangan setelah dipublish?",
    answer: "Ya, Anda masih bisa melakukan perubahan pada informasi acara, galeri foto, dan detail lainnya bahkan setelah undangan dipublish."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum seputar layanan BahteraKita
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
