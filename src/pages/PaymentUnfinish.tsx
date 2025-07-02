
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, CreditCard } from "lucide-react";

const PaymentUnfinish = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Log unfinished payment for debugging
    console.log("Payment Unfinished - Query params:", Object.fromEntries(searchParams));
  }, [searchParams]);

  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="text-center shadow-lg">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <Clock className="w-16 h-16 text-yellow-500" />
            </motion.div>
            <CardTitle className="text-2xl text-yellow-700">
              Pembayaran Belum Selesai
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Pembayaran Anda belum diselesaikan. Jangan khawatir, pesanan Anda masih tersimpan.
            </p>
            
            {orderId && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Order ID:</p>
                <p className="font-mono text-sm font-medium">{orderId}</p>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Apa yang terjadi?</strong><br />
                Anda keluar dari halaman pembayaran sebelum menyelesaikan transaksi.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => navigate("/checkout")} 
                className="w-full bg-slate-900 hover:bg-slate-800"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Lanjutkan Pembayaran
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/")} 
                className="w-full"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Butuh bantuan? Hubungi customer service kami melalui WhatsApp.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentUnfinish;
