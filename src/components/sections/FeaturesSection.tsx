
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
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl select-none">
            Fitur Lengkap untuk Undangan Impian
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 select-none">
            Berbagai fitur canggih yang memudahkan Anda membuat undangan pernikahan digital yang berkesan
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900 select-none">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto select-none">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
