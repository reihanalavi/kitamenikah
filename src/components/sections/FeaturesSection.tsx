
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
    <section id="features" className="py-20 bg-gradient-to-r from-blue-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Fitur Lengkap untuk Undangan Impian
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Berbagai fitur canggih yang memudahkan Anda membuat undangan pernikahan digital yang berkesan
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
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
