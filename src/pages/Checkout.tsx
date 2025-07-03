
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Package, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface PricingPackage {
  id: number;
  paket: string;
  harga_paket: number;
  deskripsi_paket: string;
}

interface Template {
  id: string;
  name: string;
  price: number;
  photo_url?: string;
}

const Checkout = () => {
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [resumeOrderId, setResumeOrderId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    checkAuth();
    
    // Check if resuming an existing order
    const resumeId = searchParams.get('resume_order_id');
    if (resumeId) {
      setResumeOrderId(resumeId);
      loadExistingTransaction(resumeId);
    } else {
      // Load selected items from URL params for new orders
      const packageId = searchParams.get('package');
      const templateId = searchParams.get('template');
      
      if (packageId) loadPackage(parseInt(packageId));
      if (templateId) loadTemplate(templateId);
    }
  }, [searchParams]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login Required",
          description: "Anda harus login untuk melakukan checkout.",
        });
        navigate("/auth");
        return;
      }

      setUser(session.user);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate("/auth");
    }
  };

  const loadExistingTransaction = async (orderId: string) => {
    try {
      const { data: transaction, error } = await supabase
        .from('midtrans_transactions')
        .select('*')
        .eq('order_id', orderId)
        .eq('status', 'pending')
        .single();

      if (error || !transaction) {
        toast({
          title: "Error",
          description: "Transaksi tidak ditemukan atau sudah selesai.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      // Load customer data from existing transaction
      setCustomerData({
        name: transaction.customer_name,
        email: transaction.customer_email,
        phone: transaction.customer_phone,
      });

      // Load package and template data if available
      if (transaction.pricing_package_id) {
        await loadPackage(transaction.pricing_package_id);
      }
      
      if (transaction.template_id) {
        await loadTemplate(transaction.template_id);
      }
      
    } catch (error) {
      console.error('Error loading existing transaction:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data transaksi.",
        variant: "destructive",
      });
    }
  };

  const loadPackage = async (packageId: number) => {
    try {
      const { data, error } = await supabase
        .from('Pricing')
        .select('*')
        .eq('id', packageId)
        .single();

      if (error) {
        console.error('Error loading package:', error);
        return;
      }

      setSelectedPackage(data);
    } catch (error) {
      console.error('Error loading package:', error);
    }
  };

  const loadTemplate = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('Template')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) {
        console.error('Error loading template:', error);
        return;
      }

      setSelectedTemplate(data);
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };

  const calculateTotal = () => {
    const packagePrice = selectedPackage?.harga_paket || 0;
    const templatePrice = selectedTemplate?.price || 0;
    return packagePrice + templatePrice;
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Anda harus login terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    if (!customerData.name || !customerData.email || !customerData.phone) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua data pelanggan.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPackage && !selectedTemplate) {
      toast({
        title: "Error",
        description: "Pilih minimal satu paket atau template.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let itemName = "";
      if (selectedPackage && selectedTemplate) {
        itemName = `Paket ${selectedPackage.paket} + Template ${selectedTemplate.name}`;
      } else if (selectedPackage) {
        itemName = `Paket ${selectedPackage.paket}`;
      } else if (selectedTemplate) {
        itemName = `Template ${selectedTemplate.name}`;
      }

      const orderData = {
        orderId: resumeOrderId || `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount: calculateTotal(),
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        itemName: itemName,
        itemId: selectedPackage?.id || selectedTemplate?.id || "ITEM-1",
        userId: user.id,
        pricingPackageId: selectedPackage?.id || null,
        templateId: selectedTemplate?.id || null
      };

      const { data, error } = await supabase.functions.invoke('create-midtrans-token', {
        body: { 
          orderData: orderData,
          resumeOrderId: resumeOrderId 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        toast({
          title: "Error",
          description: "Gagal membuat transaksi pembayaran.",
          variant: "destructive",
        });
        return;
      }

      if (data.error) {
        console.error('Midtrans error:', data.error);
        toast({
          title: "Error",
          description: typeof data.error === 'string' ? data.error : "Gagal membuat transaksi pembayaran.",
          variant: "destructive",
        });
        return;
      }

      // Redirect to Midtrans payment page
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        toast({
          title: "Error",
          description: "URL pembayaran tidak ditemukan.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses pembayaran.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {resumeOrderId ? "Lanjutkan Pembayaran" : "Checkout"}
              </h1>
              <p className="text-lg text-gray-600">
                {resumeOrderId ? "Selesaikan pembayaran Anda" : "Selesaikan pesanan Anda"}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Informasi Pelanggan
                </CardTitle>
                <CardDescription>
                  Masukkan data Anda untuk proses pembayaran
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Masukkan email"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Masukkan nomor telepon"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Ringkasan Pesanan
                </CardTitle>
                <CardDescription>
                  Detail item yang akan Anda beli
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPackage && (
                  <div className="flex justify-between items-start p-4 bg-blue-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Paket {selectedPackage.paket}</h3>
                      <p className="text-sm text-blue-700 mt-1">{selectedPackage.deskripsi_paket}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-900">
                        {formatCurrency(selectedPackage.harga_paket)}
                      </p>
                    </div>
                  </div>
                )}

                {selectedTemplate && (
                  <div className="flex justify-between items-start p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start gap-3 flex-1">
                      {selectedTemplate.photo_url ? (
                        <img 
                          src={selectedTemplate.photo_url} 
                          alt={selectedTemplate.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-green-900">Template {selectedTemplate.name}</h3>
                        <p className="text-sm text-green-700 mt-1">Template undangan premium</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-900">
                        {formatCurrency(selectedTemplate.price)}
                      </p>
                    </div>
                  </div>
                )}

                {!selectedPackage && !selectedTemplate && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Tidak ada item yang dipilih</p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/")}
                      className="mt-4"
                    >
                      Pilih Paket/Template
                    </Button>
                  </div>
                )}

                {(selectedPackage || selectedTemplate) && (
                  <>
                    <Separator />
                    
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-lg font-semibold">Total Pembayaran</span>
                      <span className="text-2xl font-bold text-slate-900">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>

                    <Button 
                      onClick={handlePayment}
                      disabled={loading || !customerData.name || !customerData.email || !customerData.phone}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          {resumeOrderId ? "Lanjutkan Pembayaran" : "Bayar Sekarang"}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami.
                      Pembayaran diproses dengan aman melalui Midtrans.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
