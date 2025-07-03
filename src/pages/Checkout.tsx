
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get parameters from URL
  const packageId = searchParams.get('package');
  const templateId = searchParams.get('template');
  const resumeOrderId = searchParams.get('resume');
  
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [packageInfo, setPackageInfo] = useState<any>(null);
  const [templateInfo, setTemplateInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load package info if packageId exists
        if (packageId) {
          const { data: pricingData, error: pricingError } = await supabase
            .from('Pricing')
            .select('*')
            .eq('id', packageId)
            .single();
          
          if (pricingError) {
            console.error('Error fetching pricing:', pricingError);
          } else {
            setPackageInfo(pricingData);
          }
        }

        // Load template info if templateId exists
        if (templateId) {
          const { data: templateData, error: templateError } = await supabase
            .from('Template')
            .select('*')
            .eq('id', templateId)
            .single();
          
          if (templateError) {
            console.error('Error fetching template:', templateError);
          } else {
            setTemplateInfo(templateData);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, [packageId, templateId]);

  useEffect(() => {
    // Load Midtrans Snap script
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', 'SB-Mid-client-YOUR_CLIENT_KEY');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calculateTotalAmount = () => {
    let total = 0;
    if (packageInfo) total += packageInfo.harga_paket;
    if (templateInfo) total += templateInfo.price;
    return total;
  };

  const handlePayment = async () => {
    if (!customerData.name || !customerData.email || !customerData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all customer information",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const totalAmount = calculateTotalAmount();
      const orderId = resumeOrderId || `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const orderData = {
        orderId,
        amount: totalAmount,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        itemName: `${packageInfo?.paket || ''} ${templateInfo?.name || ''}`.trim(),
        itemId: `item-${Date.now()}`,
        userId: user?.id,
        pricingPackageId: packageId ? parseInt(packageId) : null,
        templateId: templateId || null
      };

      const { data, error } = await supabase.functions.invoke('create-midtrans-token', {
        body: { 
          orderData,
          resumeOrderId: resumeOrderId 
        }
      });

      if (error) {
        console.error('Error creating payment token:', error);
        toast({
          title: "Payment Error",
          description: "Failed to create payment token",
          variant: "destructive"
        });
        return;
      }

      // Use Midtrans Snap
      window.snap.pay(data.token, {
        onSuccess: (result) => {
          console.log('Payment success:', result);
          navigate('/payment/success');
        },
        onPending: (result) => {
          console.log('Payment pending:', result);
          navigate('/payment/unfinish');
        },
        onError: (result) => {
          console.log('Payment error:', result);
          navigate('/payment/error');
        },
        onClose: () => {
          console.log('Payment popup closed');
        }
      });

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "An error occurred while processing payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Loading checkout information...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              
              {packageInfo && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{packageInfo.paket}</h4>
                    <p className="text-sm text-gray-600">{packageInfo.deskripsi_paket}</p>
                  </div>
                  <span className="font-semibold">Rp {packageInfo.harga_paket.toLocaleString()}</span>
                </div>
              )}

              {templateInfo && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{templateInfo.name}</h4>
                    <p className="text-sm text-gray-600">Wedding Invitation Template</p>
                  </div>
                  <span className="font-semibold">Rp {templateInfo.price.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>Rp {calculateTotalAmount().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button 
              onClick={handlePayment} 
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Processing..." : `Pay Rp ${calculateTotalAmount().toLocaleString()}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
