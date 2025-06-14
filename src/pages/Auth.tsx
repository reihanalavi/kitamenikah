
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-gray-900 hover:text-slate-700 transition-colors">
            KitaMenikah
          </Link>
          <p className="text-gray-600 mt-2">Platform Undangan Pernikahan Digital</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isLogin ? "Masuk Akun" : "Daftar Akun"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin 
                ? "Masuk untuk mengakses dashboard Anda" 
                : "Buat akun untuk memulai membuat undangan"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Nama Lengkap</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Masukkan nama lengkap"
                    className="border-gray-200 focus:border-slate-400 focus:ring-slate-400"
                    required 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="nama@email.com"
                  className="border-gray-200 focus:border-slate-400 focus:ring-slate-400"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Masukkan password"
                  className="border-gray-200 focus:border-slate-400 focus:ring-slate-400"
                  required 
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-700">Konfirmasi Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Konfirmasi password"
                    className="border-gray-200 focus:border-slate-400 focus:ring-slate-400"
                    required 
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                {isLogin ? "Masuk" : "Daftar"}
              </Button>
            </form>

            <div className="text-center space-y-2">
              {isLogin ? (
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-slate-700 hover:text-slate-900 font-semibold transition-colors"
                  >
                    Daftar di sini
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-slate-700 hover:text-slate-900 font-semibold transition-colors"
                  >
                    Masuk di sini
                  </button>
                </p>
              )}
            </div>

            {isLogin && (
              <div className="text-center">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-gray-600 hover:text-slate-700 transition-colors"
                >
                  Lupa password?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-slate-700 transition-colors inline-flex items-center gap-2"
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
