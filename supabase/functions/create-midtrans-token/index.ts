
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderData, resumeOrderId } = await req.json();
    console.log('Received request:', { orderData, resumeOrderId });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // If resuming existing order, fetch from database
    if (resumeOrderId) {
      console.log('Resuming order:', resumeOrderId);
      
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('midtrans_transactions')
        .select('*')
        .eq('order_id', resumeOrderId)
        .eq('status', 'pending')
        .single();

      if (fetchError) {
        console.error('Error fetching existing transaction:', fetchError);
        return new Response(
          JSON.stringify({ error: 'Transaction not found or already completed' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          token: existingTransaction.snap_token,
          redirect_url: existingTransaction.redirect_url 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create new transaction
    const serverKey = 'SB-Mid-server-z0c-vp_RqRhCTImkjcEwPioM';
    const encodedServerKey = btoa(serverKey + ':');

    const parameter = {
      transaction_details: {
        order_id: orderData.orderId,
        gross_amount: parseInt(orderData.amount)
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone
      },
      item_details: [{
        id: orderData.itemId,
        price: parseInt(orderData.amount),
        quantity: 1,
        name: orderData.itemName
      }]
    };

    console.log('Creating Snap token with parameter:', parameter);

    const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedServerKey}`
      },
      body: JSON.stringify(parameter)
    });

    const snapResponse = await response.json();
    console.log('Midtrans response:', snapResponse);

    if (!response.ok) {
      console.error('Midtrans API error:', snapResponse);
      return new Response(
        JSON.stringify({ error: snapResponse.error_messages || 'Failed to create transaction' }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Save transaction to database
    const { error: insertError } = await supabase
      .from('midtrans_transactions')
      .insert({
        order_id: orderData.orderId,
        snap_token: snapResponse.token,
        redirect_url: snapResponse.redirect_url,
        amount: parseInt(orderData.amount),
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        item_name: orderData.itemName,
        status: 'pending'
      });

    if (insertError) {
      console.error('Error saving transaction to database:', insertError);
      // Still return the token even if DB save fails
    } else {
      console.log('Transaction saved to database successfully');
    }

    return new Response(
      JSON.stringify({ 
        token: snapResponse.token,
        redirect_url: snapResponse.redirect_url 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
