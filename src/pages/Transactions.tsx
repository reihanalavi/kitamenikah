import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ExternalLink, CreditCard, Calendar, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { forceUpdateTransactionStatus } from "@/utils/forceStatusUpdate";

interface Transaction {
  id: string;
  order_id: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  item_name: string;
  status: string;
  snap_token: string;
  redirect_url?: string;
  created_at: string;
  updated_at: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login Required",
          description: "Anda harus login untuk melihat riwayat transaksi.",
        });
        navigate("/auth");
        return;
      }

      setUser(session.user);
      await fetchTransactions();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate("/auth");
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('midtrans_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Gagal memuat riwayat transaksi.",
          variant: "destructive",
        });
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error('Fetch transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForceUpdate = async (orderId: string, newStatus: 'success' | 'failed') => {
    setUpdatingStatus(orderId);
    
    const result = await forceUpdateTransactionStatus(orderId, newStatus);
    
    if (result.success) {
      toast({
        title: "Status Updated",
        description: `Transaction ${orderId} updated to ${newStatus}`,
      });
      // Refresh transactions
      await fetchTransactions();
    } else {
      toast({
        title: "Update Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setUpdatingStatus(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Berhasil</Badge>;
      case 'pending':
        return <Badge variant="secondary">Menunggu</Badge>;
      case 'failed':
        return <Badge variant="destructive">Gagal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePaymentResume = (transaction: Transaction) => {
    navigate(`/checkout?resume_order_id=${transaction.order_id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat riwayat transaksi...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}  
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Riwayat Transaksi
              </h1>
              <p className="text-lg text-gray-600">
                Kelola dan pantau semua transaksi pembayaran Anda
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{transactions.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Berhasil</CardTitle>
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {transactions.filter(t => t.status === 'success').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
                <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {transactions.filter(t => t.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Transaksi</CardTitle>
              <CardDescription>
                Semua transaksi pembayaran yang pernah Anda lakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Belum Ada Transaksi
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Anda belum melakukan transaksi apapun. Mulai berbelanja sekarang!
                  </p>
                  <Button onClick={() => navigate("/")} className="bg-slate-900 hover:bg-slate-800">
                    Mulai Berbelanja
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {transaction.order_id}
                          </TableCell>
                          <TableCell>{transaction.item_name}</TableCell>
                          <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {formatDate(transaction.created_at)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {transaction.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handlePaymentResume(transaction)}
                                    className="bg-slate-900 hover:bg-slate-800"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Lanjutkan Bayar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleForceUpdate(transaction.order_id, 'success')}
                                    disabled={updatingStatus === transaction.order_id}
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                  >
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    {updatingStatus === transaction.order_id ? 'Updating...' : 'Mark Success'}
                                  </Button>
                                </>
                              )}
                              {transaction.status === 'success' && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Selesai
                                </Badge>
                              )}
                              {transaction.status === 'failed' && (
                                <Badge variant="outline" className="text-red-600 border-red-600">
                                  Gagal
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Transactions;
