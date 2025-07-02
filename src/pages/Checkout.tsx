import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    alamat: "",
    catatan: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSnapLoaded, setIsSnapLoaded] = useState(false);

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', 'SB-Mid-client-IyRoK03bZbfDRlWA');
    script.onload = () => {
      console.log('Midtrans Snap script loaded successfully');
      setIsSnapLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Midtrans Snap script');
      toast({
        title: "Error",
        description: "Gagal memuat sistem pembayaran. Silakan refresh halaman.",
        variant: "destructive"
      });
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src="https://app.sandbox.midtrans.com/snap/snap.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [toast]);

  // Dummy data for the purchased item
  const purchasedItem = {
    type: "template", // or "pricing"
    name: "Template Elegant Rose",
    price: 150000,
    description: "Template undangan digital dengan desain elegan dan romantis"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOrderId = () => {
    return 'ORDER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const handleCheckout = async () => {
    // Validate form data
    if (!formData.nama || !formData.email || !formData.phone || !formData.alamat) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Check if Snap is loaded
    if (!isSnapLoaded || !window.snap) {
      toast({
        title: "Error",
        description: "Sistem pembayaran belum siap. Silakan coba lagi dalam beberapa detik.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      
      const orderData = {
        orderId: orderId,
        amount: purchasedItem.price,
        customerName: formData.nama,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        itemId: 'template-1',
        itemName: purchasedItem.name
      };

      console.log('Processing checkout with order data:', orderData);

      // Call edge function to create Midtrans token
      const { data, error } = await supabase.functions.invoke('create-midtrans-token', {
        body: { orderData }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        throw new Error('Failed to create payment token');
      }

      console.log('Received token from edge function:', data);

      // Initialize Midtrans Snap
      window.snap.pay(data.token, {
        onSuccess: function(result: any) {
          console.log('Payment success:', result);
          toast({
            title: "Pembayaran Berhasil",
            description: "Terima kasih! Pembayaran Anda telah berhasil."
          });
          navigate(`/payment/success?order_id=${orderId}&transaction_status=settlement`);
        },
        onPending: function(result: any) {
          console.log('Payment pending:', result);
          navigate(`/payment/unfinish?order_id=${orderId}`);
        },
        onError: function(result: any) {
          console.log('Payment error:', result);
          navigate(`/payment/error?order_id=${orderId}&status_code=${result.status_code}&status_message=${result.status_message}`);
        },
        onClose: function() {
          console.log('Payment popup closed');
          navigate(`/payment/unfinish?order_id=${orderId}`);
        }
      });

    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-slate-700 transition-colors">
              KitaMenikah
            </Link>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Checkout Pesanan
            </h1>
            <p className="text-lg text-gray-600">
              Lengkapi data Anda untuk melanjutkan proses pemesanan undangan digital
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Informasi Pemesanan
                  </CardTitle>
                  <CardDescription>
                    Isi data Anda dengan lengkap dan benar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap *</Label>
                    <Input
                      id="nama"
                      name="nama"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">No. WhatsApp *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alamat">Alamat *</Label>
                    <Textarea
                      id="alamat"
                      name="alamat"
                      placeholder="Masukkan alamat lengkap"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      className="min-h-[80px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="catatan">Catatan Tambahan</Label>
                    <Textarea
                      id="catatan"
                      name="catatan"
                      placeholder="Catatan khusus untuk pesanan Anda (opsional)"
                      value={formData.catatan}
                      onChange={handleInputChange}
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Purchased Item */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Item Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {purchasedItem.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {purchasedItem.description}
                      </p>
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                        {purchasedItem.type === "template" ? "Template" : "Paket"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        Rp {purchasedItem.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/")}
                    className="w-full"
                  >
                    Ubah Pilihan
                  </Button>
                </CardContent>
              </Card>

              {/* Total Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp {purchasedItem.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span>Rp 0</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-slate-900">
                      Rp {purchasedItem.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-slate-900 hover:bg-slate-800"
                    size="lg"
                    disabled={isProcessing || !isSnapLoaded}
                  >
                    {isProcessing ? "Memproses..." : !isSnapLoaded ? "Memuat..." : "Bayar Sekarang"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                  </p>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Pembayaran Aman
                      </p>
                      <p className="text-xs text-green-600">
                        Transaksi Anda dilindungi dengan enkripsi SSL
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
