
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Berhasil keluar",
        description: "Anda telah berhasil keluar dari akun.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal keluar dari akun",
        variant: "destructive",
      });
    }
  };

  const getDisplayName = () => {
    const name = user?.user_metadata?.name || user?.user_metadata?.full_name;
    if (name && name !== "-") {
      return name;
    }
    return user?.email || "User";
  };

  const getAvatarUrl = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only select-none">SekapurSirih</span>
            <img 
              src="https://jjpfoguzwsoweehfzmxi.supabase.co/storage/v1/object/sign/kitamenikah/sekapursirih-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWJkZjViNS0zNDZkLTQyYWQtOTg5ZS1iMTI0NDgxYzIxY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJraXRhbWVuaWthaC9zZWthcHVyc2lyaWgtbG9nby5wbmciLCJpYXQiOjE3NTEyMjMxNTMsImV4cCI6MTc4Mjc1OTE1M30.Q2C1Zhm-4GeCdwx_vLw2_oM0oKh4vwoi9AAbcZTw3fc" 
              alt="SekapurSirih"
              className="h-8 w-auto select-none"
            />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only select-none">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          <button
            onClick={() => scrollToSection('features')}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600 select-none"
          >
            Fitur
          </button>
          <button
            onClick={() => scrollToSection('templates')}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600 select-none"
          >
            Template
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600 select-none"
          >
            Biaya
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={getAvatarUrl()} alt={getDisplayName()} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900">{getDisplayName()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/transactions')} className="cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Transaksi
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-600 select-none"
            >
              Masuk/Daftar
            </Link>
          )}
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="sticky top-0 right-0 h-auto w-full sm:max-w-sm z-10 overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <button
                    onClick={() => scrollToSection('features')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 select-none w-full text-left"
                  >
                    Fitur
                  </button>
                  <button
                    onClick={() => scrollToSection('templates')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 select-none w-full text-left"
                  >
                    Template
                  </button>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 select-none w-full text-left"
                  >
                    Biaya
                  </button>
                </div>
                <div className="py-6">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getAvatarUrl()} alt={getDisplayName()} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-base font-semibold text-gray-900">{getDisplayName()}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigate('/transactions');
                          setIsMenuOpen(false);
                        }}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 select-none w-full text-left"
                      >
                        <CreditCard className="mr-2 h-4 w-4 inline" />
                        Transaksi
                      </button>
                      <button
                        onClick={handleLogout}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50 select-none w-full text-left"
                      >
                        <LogOut className="mr-2 h-4 w-4 inline" />
                        Keluar
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 select-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Masuk/Daftar
                    </Link>
                  )}
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
