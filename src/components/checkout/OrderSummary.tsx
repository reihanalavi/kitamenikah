
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  selectedPricing: any;
  selectedTemplate: any;
  pendingTransaction: any;
  getTotalPrice: () => number;
  onCheckout: () => void;
  isProcessing: boolean;
  isSnapLoaded: boolean;
}

const OrderSummary = ({ 
  selectedPricing, 
  selectedTemplate, 
  pendingTransaction, 
  getTotalPrice, 
  onCheckout, 
  isProcessing, 
  isSnapLoaded 
}: OrderSummaryProps) => {
  const navigate = useNavigate();

  const handleChangePackage = () => {
    navigate('/#pricing');
  };

  const handleChangeTemplate = () => {
    navigate('/templates');
  };

  return (
    <>
      {/* Selected Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Item Pesanan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedPricing && (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg text-gray-900">{selectedPricing.paket}</h4>
                {!pendingTransaction && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleChangePackage}
                    className="text-xs"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Ubah Paket
                  </Button>
                )}
              </div>
              
              {/* Template included in package */}
              {selectedTemplate && (
                <div className="ml-4 border-l-2 border-gray-200 pl-4 mt-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedTemplate.photo_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop"} 
                        alt={selectedTemplate.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Include Template:</p>
                        <p className="font-medium text-gray-900">{selectedTemplate.name}</p>
                      </div>
                    </div>
                    {!pendingTransaction && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleChangeTemplate}
                        className="text-xs"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Ubah Template
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pembayaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedPricing && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{selectedPricing.paket}</span>
              <span>Rp {selectedPricing.harga_paket.toLocaleString('id-ID')}</span>
            </div>
          )}
          
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-slate-900">
              Rp {getTotalPrice().toLocaleString('id-ID')}
            </span>
          </div>

          <Button 
            onClick={onCheckout}
            className="w-full mt-6 bg-slate-900 hover:bg-slate-800"
            size="lg"
            disabled={isProcessing || !isSnapLoaded || getTotalPrice() === 0}
          >
            {isProcessing ? "Memproses..." : !isSnapLoaded ? "Memuat..." : 
             pendingTransaction ? "Lanjutkan Pembayaran" : "Bayar Sekarang"}
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
              <svg className="w-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </>
  );
};

export default OrderSummary;
