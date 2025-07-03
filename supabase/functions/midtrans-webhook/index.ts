
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

  console.log('=== MIDTRANS WEBHOOK RECEIVED ===')
  console.log('Method:', req.method)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse webhook data from Midtrans
    const notification = await req.json()
    console.log('=== MIDTRANS NOTIFICATION DATA ===')
    console.log(JSON.stringify(notification, null, 2))

    const {
      order_id,
      transaction_status,
      fraud_status,
      settlement_time,
      transaction_time,
      signature_key,
      status_code,
      gross_amount
    } = notification

    if (!order_id) {
      console.error('❌ No order_id in notification')
      return new Response(JSON.stringify({ error: 'No order_id provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log(`📝 Processing order: ${order_id}`)
    console.log(`📝 Transaction status: ${transaction_status}`)
    console.log(`📝 Fraud status: ${fraud_status}`)
    console.log(`📝 Status code: ${status_code}`)

    // Check if transaction exists first
    const { data: existingTransaction, error: checkError } = await supabaseClient
      .from('midtrans_transactions')
      .select('*')
      .eq('order_id', order_id)
      .single()

    if (checkError) {
      console.error('❌ Error checking existing transaction:', checkError)
      return new Response(JSON.stringify({ error: 'Transaction not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('📝 Current transaction status in DB:', existingTransaction.status)

    // Determine final status based on Midtrans response
    let finalStatus = 'pending'
    
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      if (fraud_status === 'accept' || !fraud_status) {
        finalStatus = 'success'
      } else {
        finalStatus = 'failed'
      }
    } else if (transaction_status === 'pending') {
      finalStatus = 'pending'
    } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
      finalStatus = 'failed'
    }

    console.log(`🔄 Updating order ${order_id} status from '${existingTransaction.status}' to '${finalStatus}'`)

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
      console.error('❌ Error updating transaction:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to update transaction',
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (!data || data.length === 0) {
      console.log('⚠️ No rows updated for order_id:', order_id)
      return new Response(JSON.stringify({ 
        error: 'No transaction updated',
        order_id 
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ Transaction updated successfully:')
    console.log('Updated data:', JSON.stringify(data[0], null, 2))

    // Check if trigger fired by looking at the updated record
    const { data: updatedRecord } = await supabaseClient
      .from('midtrans_transactions')
      .select('*')
      .eq('order_id', order_id)
      .single()

    console.log('📝 Final record in DB:', JSON.stringify(updatedRecord, null, 2))

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Transaction updated successfully',
      order_id,
      old_status: existingTransaction.status,
      new_status: finalStatus,
      updated_record: updatedRecord
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    console.error('Error details:', error.message)
    console.error('Stack trace:', error.stack)
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
