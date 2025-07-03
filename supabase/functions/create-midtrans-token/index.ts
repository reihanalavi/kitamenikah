
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderData } = await req.json()
    console.log('Received order data:', orderData)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get Midtrans server key
    const midtransServerKey = Deno.env.get('MIDTRANS_SERVER_KEY')
    if (!midtransServerKey) {
      throw new Error('Midtrans server key not configured')
    }

    // Create authorization header for Midtrans
    const auth = btoa(midtransServerKey + ':')

    // Prepare transaction details for Midtrans
    const transactionDetails = {
      transaction_details: {
        order_id: orderData.orderId,
        gross_amount: orderData.amount
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: orderData.customerName,
        last_name: "",
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
      ]
    }

    console.log('Sending to Midtrans:', JSON.stringify(transactionDetails, null, 2))

    // Create transaction with Midtrans
    const midtransResponse = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(transactionDetails)
    })

    const midtransData = await midtransResponse.json()
    console.log('Midtrans response:', midtransData)

    if (!midtransResponse.ok) {
      console.error('Midtrans error:', midtransData)
      throw new Error(`Midtrans API error: ${midtransData.error_messages?.[0] || 'Unknown error'}`)
    }

    // Store transaction in database with separate pricing and template info
    const { error: dbError } = await supabase
      .from('midtrans_transactions')
      .insert({
        order_id: orderData.orderId,
        snap_token: midtransData.token,
        amount: orderData.amount,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        item_name: orderData.itemName,
        status: 'pending',
        user_id: orderData.userId,
        pricing_package_id: orderData.pricingPackageId,
        pricing_package_name: orderData.pricingPackageName,
        template_id: orderData.templateId,
        template_name: orderData.templateName,
        redirect_url: midtransData.redirect_url
      })

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store transaction in database')
    }

    console.log('Transaction stored successfully')

    return new Response(
      JSON.stringify({ 
        token: midtransData.token,
        redirect_url: midtransData.redirect_url 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in create-midtrans-token:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
