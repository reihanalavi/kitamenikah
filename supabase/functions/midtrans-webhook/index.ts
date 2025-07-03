
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

  console.log('🔥 MIDTRANS WEBHOOK RECEIVED!')
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))

  try {
    // Use SERVICE ROLE KEY for webhook updates (bypass RLS)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse webhook data from Midtrans
    const notification = await req.json()
    console.log('🔥 MIDTRANS NOTIFICATION DATA:')
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

    console.log(`🔥 Processing order: ${order_id}`)
    console.log(`🔥 Transaction status: ${transaction_status}`)
    console.log(`🔥 Fraud status: ${fraud_status}`)
    console.log(`🔥 Status code: ${status_code}`)

    // Check if transaction exists first
    const { data: existingTransaction, error: checkError } = await supabaseClient
      .from('midtrans_transactions')
      .select('*')
      .eq('order_id', order_id)
      .single()

    if (checkError || !existingTransaction) {
      console.error('❌ Transaction not found:', checkError)
      console.log('🔥 Creating webhook response for non-existent transaction')
      return new Response(JSON.stringify({ 
        error: 'Transaction not found',
        order_id: order_id,
        message: 'This is normal if webhook comes before transaction creation'
      }), {
        status: 200, // Return 200 so Midtrans doesn't retry
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('🔥 Current transaction in DB:', JSON.stringify(existingTransaction, null, 2))

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

    console.log(`🔥 UPDATING: ${existingTransaction.status} -> ${finalStatus}`)

    // Update transaction status in database using SERVICE ROLE (bypasses RLS)
    const { data: updateData, error: updateError } = await supabaseClient
      .from('midtrans_transactions')
      .update({ 
        status: finalStatus,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', order_id)
      .select()

    if (updateError) {
      console.error('❌ UPDATE ERROR:', updateError)
      return new Response(JSON.stringify({ 
        error: 'Failed to update transaction',
        details: updateError.message,
        order_id: order_id
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (!updateData || updateData.length === 0) {
      console.log('⚠️ No rows updated for order_id:', order_id)
      return new Response(JSON.stringify({ 
        error: 'No transaction updated',
        order_id: order_id
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ TRANSACTION UPDATED SUCCESSFULLY!')
    console.log('Updated data:', JSON.stringify(updateData[0], null, 2))

    // Double check the update worked
    const { data: verifyData } = await supabaseClient
      .from('midtrans_transactions')
      .select('*')
      .eq('order_id', order_id)
      .single()

    console.log('🔥 VERIFICATION - Final record in DB:', JSON.stringify(verifyData, null, 2))

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Transaction updated successfully',
      order_id: order_id,
      old_status: existingTransaction.status,
      new_status: finalStatus,
      updated_record: updateData[0]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ WEBHOOK ERROR:', error)
    console.error('Error message:', error.message)
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
