
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw, Home, MessageCircle } from "lucide-react";

const PaymentError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Log payment error for debugging
    console.log("Payment Error - Query params:", Object.fromEntries(searchParams));
  }, [searchParams]);

  const orderId = searchParams.get('order_id');
  const statusCode = searchParams.get('status_code');
  const statusMessage = searchParams.get('status_message');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
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
              <AlertCircle className="w-16 h-16 text-red-500" />
            </motion.div>
            <CardTitle className="text-2xl text-red-700">
              Pembayaran Gagal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Maaf, terjadi kesalahan saat memproses pembayaran Anda.
            </p>
            
            {orderId && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Order ID:</p>
                <p className="font-mono text-sm font-medium">{orderId}</p>
              </div>
            )}

            {statusCode && (
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Error Code:</p>
                <p className="font-medium text-red-700">{statusCode}</p>
              </div>
            )}

            {statusMessage && (
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Pesan Error:</p>
                <p className="text-sm text-red-700">{statusMessage}</p>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Kemungkinan penyebab:</strong><br />
                • Kartu kredit/debit ditolak<br />
                • Saldo tidak mencukupi<br />
                • Koneksi internet terputus<br />
                • Server pembayaran sedang gangguan
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => navigate("/checkout")} 
                className="w-full"
                size="lg"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.open("https://wa.me/6281234567890", "_blank")} 
                className="w-full"
                size="lg"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Hubungi Customer Service
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => navigate("/")} 
                className="w-full"
                size="lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Jika masalah berlanjut, silakan hubungi tim support kami.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentError;
