import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
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
              <Shield className="w-8 h-8 text-slate-700" />
              <h1 className="text-3xl font-bold text-gray-900">Kebijakan Privasi</h1>
            </div>
            
            <p className="text-gray-600 text-lg">
              Kami di SekapurSirih berkomitmen untuk melindungi privasi dan data pribadi setiap pengguna. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi yang Anda berikan.
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
                  <CardTitle className="text-xl text-slate-700">Data yang Kami Kumpulkan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Informasi pribadi:</p>
                    <p className="text-gray-600">nama, email, nomor telepon</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Informasi acara:</p>
                    <p className="text-gray-600">nama pengantin, tanggal pernikahan, lokasi, dan detail lainnya</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Informasi teknis:</p>
                    <p className="text-gray-600">alamat IP, jenis perangkat, dan data penggunaan situs</p>
                  </div>
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
                  <CardTitle className="text-xl text-slate-700">Penggunaan Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">Data yang kami kumpulkan digunakan untuk:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Proses pembuatan undangan digital</li>
                    <li>• Komunikasi terkait pesanan</li>
                    <li>• Pengembangan layanan dan peningkatan kualitas pengalaman pengguna</li>
                    <li>• Keperluan analisis internal (tanpa mengungkapkan identitas pribadi)</li>
                  </ul>
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
                  <CardTitle className="text-xl text-slate-700">Perlindungan Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Kami menggunakan langkah-langkah keamanan teknis dan administratif untuk melindungi 
                    data pengguna dari akses, penggunaan, atau pengungkapan yang tidak sah.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-700">Pihak Ketiga</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga, 
                    kecuali jika diperlukan untuk menyelesaikan layanan atau diwajibkan oleh hukum.
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

export default PrivacyPolicy;
