
-- Create table to store Midtrans transactions
CREATE TABLE public.midtrans_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  snap_token TEXT NOT NULL,
  redirect_url TEXT,
  amount INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  item_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.midtrans_transactions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read transactions (for checking status)
CREATE POLICY "Allow read access to transactions" 
  ON public.midtrans_transactions 
  FOR SELECT 
  USING (true);

-- Allow anyone to insert transactions
CREATE POLICY "Allow insert transactions" 
  ON public.midtrans_transactions 
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to update transaction status
CREATE POLICY "Allow update transaction status" 
  ON public.midtrans_transactions 
  FOR UPDATE 
  USING (true);

-- Create index for better performance
CREATE INDEX idx_midtrans_transactions_order_id ON public.midtrans_transactions(order_id);
CREATE INDEX idx_midtrans_transactions_status ON public.midtrans_transactions(status);
