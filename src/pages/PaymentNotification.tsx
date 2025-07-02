import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const PaymentNotification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Handle POST request dari Midtrans
    const handleNotification = async () => {
      try {
        // Log notification data
        console.log("Payment notification endpoint accessed");
        
        // Di production, ini akan handle POST request dari Midtrans
        // dengan data notification yang berisi:
        // - order_id
        // - transaction_status
        // - payment_type
        // - gross_amount
        // - signature_key
        // dll.
        
      } catch (error) {
        console.error("Error handling payment notification:", error);
      }
    };

    handleNotification();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Payment Notification Handler
                <Badge variant="secondary">Development</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Endpoint Information</h3>
                  <p className="text-blue-800 text-sm">
                    <strong>URL:</strong> /payment/notification<br />
                    <strong>Method:</strong> POST<br />
                    <strong>Purpose:</strong> Receive payment notifications from Midtrans
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Midtrans Configuration</h3>
                  <p className="text-yellow-800 text-sm">
                    Set these URLs in your Midtrans dashboard:<br />
                    • <strong>Payment Notification URL:</strong> https://your-domain.com/payment/notification<br />
                    • <strong>Recurring Notification URL:</strong> https://your-domain.com/payment/notification<br />
                    • <strong>Pay Account Notification URL:</strong> https://your-domain.com/payment/notification
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Expected Data</h3>
                  <p className="text-green-800 text-sm">
                    Midtrans will send POST requests with notification data including:<br />
                    • order_id, transaction_status, payment_type<br />
                    • gross_amount, signature_key, fraud_status<br />
                    • transaction_time, settlement_time
                  </p>
                </div>

                {notifications.length > 0 && (
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Recent Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map((notification, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          <pre>{JSON.stringify(notification, null, 2)}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentNotification;
