
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Music, User, Calendar, Quote, Camera } from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Custom Halaman Cover",
    description: "Desain halaman cover yang unik sesuai dengan tema pernikahan Anda"
  },
  {
    icon: User,
    title: "Nama Tamu Personal",
    description: "Setiap undangan ditujukan secara personal untuk setiap tamu undangan"
  },
  {
    icon: Music,
    title: "Custom Musik Backsound",
    description: "Tambahkan musik favorit sebagai backsound undangan digital Anda"
  },
  {
    icon: Calendar,
    title: "Kelola Acara Undangan",
    description: "Atur jadwal acara pernikahan dengan detail waktu dan lokasi"
  },
  {
    icon: Quote,
    title: "Custom Kutipan/Quotes",
    description: "Sisipkan kutipan romantis atau ayat suci yang bermakna"
  },
  {
    icon: Camera,
    title: "Galeri Foto & Video",
    description: "Unggah foto dan video kenangan indah perjalanan cinta Anda"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fitur Lengkap untuk Undangan Impian
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai fitur canggih yang memudahkan Anda membuat undangan pernikahan digital yang berkesan
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
