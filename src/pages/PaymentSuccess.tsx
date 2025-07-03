
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { checkTransactionStatus, updateTransactionStatus } from "@/utils/midtransUtils";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [isChecking, setIsChecking] = useState(true);
  const [transactionData, setTransactionData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAndUpdateStatus = async () => {
      if (!orderId) {
        setIsChecking(false);
        return;
      }

      try {
        // Check current status in database
        const transaction = await checkTransactionStatus(orderId);
        
        if (transaction) {
          setTransactionData(transaction);
          
          // If status is still pending, try to update it to success
          // since user reached success page (means Midtrans redirected them here)
          if (transaction.status === 'pending') {
            console.log('Status still pending, updating to success...');
            const updatedTransaction = await updateTransactionStatus(orderId, 'success');
            if (updatedTransaction) {
              setTransactionData(updatedTransaction);
              toast({
                title: "Status Updated",
                description: "Transaction status has been updated to success.",
              });
            }
          }
        }
      } catch (error) {
        console.error('Error checking transaction:', error);
        toast({
          title: "Error",
          description: "Failed to verify transaction status.",
          variant: "destructive",
        });
      } finally {
        setIsChecking(false);
      }
    };

    checkAndUpdateStatus();
  }, [orderId, toast]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 text-green-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-xl font-semibold mb-2">Verifying Payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your transaction.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-center">
              Your payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
          </div>
          
          {transactionData && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{transactionData.order_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${transactionData.status === 'success' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {transactionData.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">Rp {transactionData.amount?.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Link to="/transactions">
              <Button className="w-full">
                View My Orders
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
