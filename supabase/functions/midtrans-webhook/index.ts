
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse webhook data from Midtrans
    const notification = await req.json()
    console.log('Received Midtrans notification:', notification)

    const {
      order_id,
      transaction_status,
      fraud_status,
      settlement_time,
      transaction_time
    } = notification

    if (!order_id) {
      console.error('No order_id in notification')
      return new Response(JSON.stringify({ error: 'No order_id provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Determine final status based on Midtrans response
    let finalStatus = 'pending'
    
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      if (fraud_status === 'accept' || !fraud_status) {
        finalStatus = 'success'
      }
    } else if (transaction_status === 'pending') {
      finalStatus = 'pending'
    } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
      finalStatus = 'failed'
    }

    console.log(`Updating order ${order_id} status to: ${finalStatus}`)

    // Update transaction status in database
    const { data, error } = await supabaseClient
      .from('midtrans_transactions')
      .update({ 
        status: finalStatus,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', order_id)
      .select()

    if (error) {
      console.error('Error updating transaction:', error)
      return new Response(JSON.stringify({ error: 'Failed to update transaction' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (!data || data.length === 0) {
      console.log('No transaction found with order_id:', order_id)
      return new Response(JSON.stringify({ error: 'Transaction not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Transaction updated successfully:', data[0])

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Transaction updated successfully',
      order_id,
      status: finalStatus
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
