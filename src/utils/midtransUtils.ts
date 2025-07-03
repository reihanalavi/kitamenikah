
import { supabase } from "@/integrations/supabase/client";

export const checkTransactionStatus = async (orderId: string) => {
  try {
    const { data, error } = await supabase
      .from('midtrans_transactions')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error('Error checking transaction status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error checking transaction status:', error);
    return null;
  }
};

export const updateTransactionStatus = async (orderId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('midtrans_transactions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating transaction status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    return null;
  }
};
