
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Eye } from "lucide-react";

interface TemplateSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  templates: any[];
  selectedTemplate: any;
  onTemplateSelect: (template: any) => void;
}

const TemplateSelectionSheet = ({
  isOpen,
  onClose,
  templates,
  selectedTemplate,
  onTemplateSelect
}: TemplateSelectionSheetProps) => {
  const handlePreview = (template: any, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(template.previewUrl, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Pilih Template</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[calc(80vh-120px)] overflow-y-auto">
          {templates.map((template) => {
            const isSelected = selectedTemplate?.id === template.id;
            
            return (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-slate-600 bg-slate-50' : 'hover:shadow-md'
                }`}
                onClick={() => onTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img 
                      src={template.photo_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop"} 
                      alt={template.name}
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={(e) => handlePreview(template, e)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-slate-600 text-white rounded-full p-1">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm">{template.name}</h3>
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

export default TemplateSelectionSheet;
