
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderData } = await req.json();
    
    // Midtrans server key for sandbox
    const serverKey = 'SB-Mid-server-z0c-vp_RqRhCTImkjcEwPioM';
    const auth = btoa(serverKey + ':');
    
    // Create transaction details
    const transactionDetails = {
      transaction_details: {
        order_id: orderData.orderId,
        gross_amount: orderData.amount
      },
      customer_details: {
        first_name: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone
      },
      item_details: [
        {
          id: orderData.itemId,
          price: orderData.amount,
          quantity: 1,
          name: orderData.itemName
        }
      ],
      credit_card: {
        secure: true
      }
    };

    console.log('Creating Midtrans transaction:', transactionDetails);

    // Call Midtrans Snap API
    const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(transactionDetails)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Midtrans API error:', errorText);
      throw new Error(`Midtrans API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Midtrans response:', result);

    return new Response(JSON.stringify({
      token: result.token,
      redirect_url: result.redirect_url
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-midtrans-token function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to create payment token' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
