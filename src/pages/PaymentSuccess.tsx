
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Home, FileText } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Log payment success for debugging
    console.log("Payment Success - Query params:", Object.fromEntries(searchParams));
  }, [searchParams]);

  const orderId = searchParams.get('order_id');
  const transactionStatus = searchParams.get('transaction_status');
  const statusCode = searchParams.get('status_code');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
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
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl text-green-700">
              Pembayaran Berhasil!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Terima kasih! Pembayaran Anda telah berhasil diproses.
            </p>
            
            {orderId && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Order ID:</p>
                <p className="font-mono text-sm font-medium">{orderId}</p>
              </div>
            )}

            {transactionStatus && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Status:</p>
                <p className="font-medium text-green-700 capitalize">{transactionStatus}</p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => navigate("/")} 
                className="w-full"
                size="lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/orders")} 
                className="w-full"
                size="lg"
              >
                <FileText className="w-4 h-4 mr-2" />
                Lihat Pesanan
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Tim kami akan segera memproses pesanan Anda. 
              Anda akan menerima konfirmasi melalui email dan WhatsApp.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
