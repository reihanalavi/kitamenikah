import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-slate-700" />
              <h1 className="text-3xl font-bold text-gray-900">Syarat & Ketentuan</h1>
            </div>
            
            <p className="text-gray-600 text-lg">
              Dengan menggunakan layanan SekapurSirih, Anda dianggap telah membaca, memahami, 
              dan menyetujui syarat dan ketentuan berikut:
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-700">Umum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">
                    Layanan ini diperuntukkan bagi individu yang memesan undangan digital untuk 
                    keperluan pribadi (pernikahan atau acara keluarga lainnya).
                  </p>
                  <p className="text-gray-600">
                    Desain dan konten undangan akan dikustom sesuai informasi yang diberikan pengguna.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-700">Hak Cipta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">
                    Semua desain, template, dan fitur digital merupakan hak milik SekapurSirih, 
                    kecuali konten yang diunggah pengguna.
                  </p>
                  <p className="text-gray-600">
                    Pengguna tidak diperkenankan menyalin, mendistribusikan, atau memodifikasi tanpa izin tertulis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-700">Tanggung Jawab Pengguna</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">
                    Pengguna wajib memberikan data yang benar, lengkap, dan dapat dipertanggungjawabkan.
                  </p>
                  <p className="text-gray-600">
                    Segala konten yang diunggah (termasuk foto, teks, video) adalah tanggung jawab pengguna sepenuhnya.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
