
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PackageSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  pricingOptions: any[];
  selectedPricing: any;
  onPricingSelect: (pricing: any) => void;
}

const PackageSelectionSheet = ({
  isOpen,
  onClose,
  pricingOptions,
  selectedPricing,
  onPricingSelect
}: PackageSelectionSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Pilih Paket</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 max-h-[calc(80vh-120px)] overflow-y-auto">
          {pricingOptions.map((pricing) => {
            const isSelected = selectedPricing?.id === pricing.id;
            
            return (
              <Card 
                key={pricing.id} 
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-slate-600 bg-slate-50' : 'hover:shadow-md'
                }`}
                onClick={() => onPricingSelect(pricing)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{pricing.paket}</h3>
                        {isSelected && <Check className="w-5 h-5 text-slate-600" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{pricing.deskripsi_paket}</p>
                      <p className="text-2xl font-bold text-slate-900">
                        Rp {pricing.harga_paket.toLocaleString('id-ID')}
                      </p>
                      
                      {pricing.PricingBenefit && (
                        <ul className="mt-3 space-y-1">
                          {pricing.PricingBenefit.map((benefit: any, index: number) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="text-slate-600">✓</span>
                              {benefit.benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button onClick={onClose} variant="outline" className="w-full">
            Tutup
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PackageSelectionSheet;
