
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-12 px-4">
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
            <RotateCcw className="w-8 h-8 text-slate-700" />
            <h1 className="text-3xl font-bold text-gray-900">Kebijakan Pengembalian Dana</h1>
          </div>
          
          <p className="text-gray-600 text-lg">
            Kami memahami bahwa setiap pesanan bersifat personal dan penting. Namun, karena sifat layanan 
            kami yang berbasis digital dan custom, pengembalian dana hanya dapat dilakukan dalam kondisi tertentu, yaitu:
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
                <CardTitle className="text-xl text-slate-700">Ketentuan Refund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  • Pesanan belum dikerjakan sama sekali oleh tim SekapurSirih.
                </p>
                <p className="text-gray-600">
                  • Permintaan refund diajukan dalam waktu maksimal 24 jam setelah pembayaran.
                </p>
                <p className="text-gray-600">
                  • Refund tidak berlaku apabila proses pengerjaan sudah dimulai atau revisi telah diberikan.
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
                <CardTitle className="text-xl text-slate-700">Prosedur Refund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  • Kirimkan permintaan refund melalui email atau WhatsApp dengan bukti transaksi.
                </p>
                <p className="text-gray-600">
                  • Proses refund akan dilakukan dalam 3–5 hari kerja ke rekening yang sama dengan yang digunakan untuk pembayaran.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
