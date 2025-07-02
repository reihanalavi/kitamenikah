import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const CancellationPolicy = () => {
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
              <XCircle className="w-8 h-8 text-slate-700" />
              <h1 className="text-3xl font-bold text-gray-900">Kebijakan Pembatalan</h1>
            </div>
            
            <p className="text-gray-600 text-lg">
              Kami memahami bahwa rencana bisa berubah. Untuk itu, SekapurSirih memberikan kesempatan 
              untuk membatalkan pesanan dengan ketentuan sebagai berikut:
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
                  <CardTitle className="text-xl text-slate-700">Pembatalan Sebelum Produksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">
                    • Pembatalan dapat dilakukan maksimal 24 jam setelah pembayaran jika pengerjaan belum dimulai.
                  </p>
                  <p className="text-gray-600">
                    • Dana akan dikembalikan sesuai ketentuan pada Kebijakan Refund.
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
                  <CardTitle className="text-xl text-slate-700">Pembatalan Setelah Produksi Dimulai</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">
                    • Apabila proses desain sudah dimulai, maka pembatalan tidak memungkinkan.
                  </p>
                  <p className="text-gray-600">
                    • Namun, kami tetap membuka opsi negosiasi atau penggantian slot pemesanan di kemudian hari.
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

export default CancellationPolicy;
