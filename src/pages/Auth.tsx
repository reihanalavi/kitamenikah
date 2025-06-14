
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors">
            KitaMenikah
          </Link>
          <p className="text-gray-600 mt-2">Platform Undangan Pernikahan Digital</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Masuk Akun" : "Daftar Akun"}
            </CardTitle>
            <CardDescription>
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
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Masukkan nama lengkap"
                    required 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="nama@email.com"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Masukkan password"
                  required 
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Konfirmasi password"
                    required 
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                {isLogin ? "Masuk" : "Daftar"}
              </Button>
            </form>

            <div className="text-center space-y-2">
              {isLogin ? (
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-pink-600 hover:text-pink-700 font-semibold"
                  >
                    Daftar di sini
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-pink-600 hover:text-pink-700 font-semibold"
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
                  className="text-sm text-gray-600 hover:text-pink-600"
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
            className="text-gray-600 hover:text-pink-600 transition-colors"
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
