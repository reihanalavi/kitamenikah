
import { supabase } from "@/integrations/supabase/client";

export const forceUpdateTransactionStatus = async (orderId: string, newStatus: 'success' | 'failed' | 'pending') => {
  try {
    console.log(`🔥 Force updating ${orderId} to ${newStatus}`);
    
    const { data, error } = await supabase
      .from('midtrans_transactions')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) {
      console.error('❌ Force update error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Force update successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Force update exception:', error);
    return { success: false, error: error.message };
  }
};
