import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const Disclaimer = () => {
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
              <AlertTriangle className="w-8 h-8 text-slate-700" />
              <h1 className="text-3xl font-bold text-gray-900">Disclaimer / Penyangkalan</h1>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-700">Keterbatasan Tanggung Jawab</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">
                    • SekapurSirih tidak bertanggung jawab atas kesalahan informasi yang diberikan oleh pengguna.
                  </p>
                  <p className="text-gray-600">
                    • Kami tidak menjamin bahwa undangan digital akan tampil sempurna pada semua perangkat atau browser, 
                    meskipun kami telah mengoptimalkannya semaksimal mungkin.
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
                  <CardTitle className="text-xl text-slate-700">Perubahan Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    SekapurSirih berhak mengubah atau menghentikan layanan sementara maupun permanen, 
                    dengan atau tanpa pemberitahuan terlebih dahulu.
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
                  <CardTitle className="text-xl text-slate-700">Konten Pihak Ketiga</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Jika pengguna menyertakan tautan atau media eksternal (seperti Google Maps, YouTube, Spotify), 
                    maka pengguna tunduk pada kebijakan dan ketentuan pihak ketiga tersebut.
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

export default Disclaimer;
