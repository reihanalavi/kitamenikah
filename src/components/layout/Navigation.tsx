
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">BahteraKita</span>
            <img 
              src="/public/bahterakita-logo.png" 
              alt="BahteraKita"
              className="h-8 w-auto"
            />
          </a>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={() => scrollToSection('features')}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600"
          >
            Fitur
          </button>
          <button
            onClick={() => scrollToSection('templates')}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600"
          >
            Template
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600"
          >
            Biaya
          </button>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <img 
                src="/lovable-uploads/542e45ab-08df-4971-a4ec-d7558399992d.png" 
                alt="BahteraKita"
                className="h-8 w-auto"
              />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <button
                    onClick={() => scrollToSection('features')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Fitur
                  </button>
                  <button
                    onClick={() => scrollToSection('templates')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Template
                  </button>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Biaya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
