
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const resumeOrderId = searchParams.get('resume_order_id');
  const templateId = searchParams.get('template_id');
  const pricingId = searchParams.get('pricing_id');
  
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    alamat: "",
    catatan: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSnapLoaded, setIsSnapLoaded] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<any>(null);
  
  // Selected items state
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedPricing, setSelectedPricing] = useState<any>(null);
  
  // Available options
  const [templates, setTemplates] = useState<any[]>([]);
  const [pricingOptions, setPricingOptions] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login Required",
          description: "Anda harus login terlebih dahulu untuk melakukan checkout.",
        });
        navigate("/auth");
        return;
      }

      setUser(session.user);
      setAuthLoading(false);
      
      // Pre-fill email from user session
      setFormData(prev => ({
        ...prev,
        email: session.user.email || "",
        nama: session.user.user_metadata?.name || session.user.user_metadata?.full_name || ""
      }));

    } catch (error) {
      console.error('Auth check error:', error);
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (!user) return;
    loadInitialData();
  }, [user, templateId, pricingId]);

  const loadInitialData = async () => {
    try {
      setLoadingData(true);
      
      // Load templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('Template')
        .select('*')
        .order('createdAt', { ascending: true });

      if (templatesError) throw templatesError;
      setTemplates(templatesData || []);

      // Load pricing options
      const { data: pricingData, error: pricingError } = await supabase
        .from('Pricing')
        .select(`
          *,
          PricingBenefit (
            benefit
          )
        `)
        .order('harga_paket', { ascending: true });

      if (pricingError) throw pricingError;
      setPricingOptions(pricingData || []);

      // Set initial selections based on URL params
      if (templateId && templatesData && pricingData) {
        const template = templatesData.find(t => t.id === templateId);
        if (template) {
          setSelectedTemplate(template);
          // Set to Basic package when template is selected
          const basicPackage = pricingData.find(p => p.paket.toLowerCase().includes('basic')) || pricingData[0];
          setSelectedPricing(basicPackage);
        }
      }

      if (pricingId && pricingData) {
        const pricing = pricingData.find(p => p.id.toString() === pricingId);
        if (pricing) {
          setSelectedPricing(pricing);
        }
      } else if (pricingData && pricingData.length > 0 && !templateId) {
        // Set default to lowest price package only if no template is selected
        const lowestPricing = pricingData.reduce((prev, current) => 
          prev.harga_paket < current.harga_paket ? prev : current
        );
        setSelectedPricing(lowestPricing);
      }

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data. Silakan refresh halaman.",
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!user) return;

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
      const existingScript = document.querySelector('script[src="https://app.sandbox.midtrans.com/snap/snap.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [user, toast]);

  useEffect(() => {
    if (resumeOrderId && isSnapLoaded && user) {
      checkPendingTransaction();
    }
  }, [resumeOrderId, isSnapLoaded, user]);

  const checkPendingTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from('midtrans_transactions')
        .select('*')
        .eq('order_id', resumeOrderId)
        .eq('status', 'pending')
        .single();

      if (error) {
        console.error('Error fetching pending transaction:', error);
        toast({
          title: "Error",
          description: "Transaksi tidak ditemukan atau sudah selesai.",
          variant: "destructive"
        });
        return;
      }

      setPendingTransaction(data);
      setFormData({
        nama: data.customer_name,
        email: data.customer_email,
        phone: data.customer_phone,
        alamat: "",
        catatan: ""
      });

      // Set pricing and template from transaction data
      if (data.pricing_package_id && pricingOptions.length > 0) {
        const pricing = pricingOptions.find(p => p.id === data.pricing_package_id);
        if (pricing) {
          setSelectedPricing(pricing);
        }
      }

      if (data.template_id && templates.length > 0) {
        const template = templates.find(t => t.id === data.template_id);
        if (template) {
          setSelectedTemplate(template);
        }
      }

      toast({
        title: "Transaksi Ditemukan",
        description: "Data pembayaran sebelumnya telah dimuat. Anda dapat melanjutkan pembayaran.",
      });
    } catch (error) {
      console.error('Error checking pending transaction:', error);
    }
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

  const getTotalPrice = () => {
    // Only use pricing package price, template is included
    return selectedPricing ? selectedPricing.harga_paket : 0;
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Sesi login bermasalah. Silakan login ulang.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    // If resuming pending transaction, use existing token
    if (pendingTransaction) {
      console.log('Resuming payment with existing token');
      initiateMidtransPayment(pendingTransaction.snap_token, pendingTransaction.order_id);
      return;
    }

    // Validate form data for new transaction
    if (!formData.nama || !formData.email || !formData.phone || !formData.alamat) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Check if pricing is selected
    if (!selectedPricing) {
      toast({
        title: "Pilihan Tidak Lengkap",
        description: "Mohon pilih paket terlebih dahulu",
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
      const totalAmount = getTotalPrice();
      
      const orderData = {
        orderId: orderId,
        amount: totalAmount,
        customerName: formData.nama,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        itemId: selectedPricing?.id || 'package-1',
        itemName: `${selectedPricing?.paket || ''} ${selectedTemplate ? `(Include ${selectedTemplate.name})` : ''}`.trim(),
        userId: user.id,
        // Add new fields for better data tracking
        pricingPackageId: selectedPricing?.id,
        pricingPackageName: selectedPricing?.paket,
        templateId: selectedTemplate?.id,
        templateName: selectedTemplate?.name
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
      initiateMidtransPayment(data.token, orderId);

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

  const initiateMidtransPayment = (token: string, orderId: string) => {
    window.snap.pay(token, {
      onSuccess: function(result: any) {
        console.log('Payment success:', result);
        updateTransactionStatus(orderId, 'success');
        toast({
          title: "Pembayaran Berhasil",
          description: "Terima kasih! Pembayaran Anda telah berhasil."
        });
        navigate(`/payment/success?order_id=${orderId}&transaction_status=settlement`);
      },
      onPending: function(result: any) {
        console.log('Payment pending:', result);
        updateTransactionStatus(orderId, 'pending');
        navigate(`/payment/unfinish?order_id=${orderId}`);
      },
      onError: function(result: any) {
        console.log('Payment error:', result);
        updateTransactionStatus(orderId, 'failed');
        navigate(`/payment/error?order_id=${orderId}&status_code=${result.status_code}&status_message=${result.status_message}`);
      },
      onClose: function() {
        console.log('Payment popup closed');
        navigate(`/payment/unfinish?order_id=${orderId}`);
      }
    });
  };

  const updateTransactionStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('midtrans_transactions')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('order_id', orderId);

      if (error) {
        console.error('Error updating transaction status:', error);
      } else {
        console.log(`Transaction ${orderId} status updated to: ${status}`);
      }
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  // Show loading while checking auth or loading data
  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Memverifikasi akses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {pendingTransaction ? "Lanjutkan Pembayaran" : "Checkout Pesanan"}
            </h1>
            <p className="text-lg text-gray-600">
              {pendingTransaction 
                ? "Anda memiliki transaksi yang belum selesai. Silakan lanjutkan pembayaran."
                : "Lengkapi data Anda untuk melanjutkan proses pemesanan undangan digital"
              }
            </p>
          </div>

          {pendingTransaction && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        Transaksi Tertunda
                      </p>
                      <p className="text-xs text-orange-600">
                        Order ID: {pendingTransaction.order_id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CheckoutForm 
                formData={formData}
                onInputChange={handleInputChange}
                isPendingTransaction={!!pendingTransaction}
              />
            </motion.div>

            {/* Right Column - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <OrderSummary 
                selectedPricing={selectedPricing}
                selectedTemplate={selectedTemplate}
                pendingTransaction={pendingTransaction}
                getTotalPrice={getTotalPrice}
                onCheckout={handleCheckout}
                isProcessing={isProcessing}
                isSnapLoaded={isSnapLoaded}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
