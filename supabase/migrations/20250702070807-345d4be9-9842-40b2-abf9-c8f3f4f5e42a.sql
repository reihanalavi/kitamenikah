
-- Add user_id column to midtrans_transactions table to associate transactions with users
ALTER TABLE public.midtrans_transactions 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies to be user-specific
DROP POLICY IF EXISTS "Allow read access to transactions" ON public.midtrans_transactions;
DROP POLICY IF EXISTS "Allow insert transactions" ON public.midtrans_transactions;
DROP POLICY IF EXISTS "Allow update transaction status" ON public.midtrans_transactions;

-- Allow users to read their own transactions
CREATE POLICY "Users can read own transactions" 
  ON public.midtrans_transactions 
  FOR SELECT 
  TO authenticated
  USING (user_id = auth.uid());

-- Allow users to insert their own transactions
CREATE POLICY "Users can insert own transactions" 
  ON public.midtrans_transactions 
  FOR INSERT 
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Allow users to update their own transactions
CREATE POLICY "Users can update own transactions" 
  ON public.midtrans_transactions 
  FOR UPDATE 
  TO authenticated
  USING (user_id = auth.uid());

-- Create index for user_id
CREATE INDEX idx_midtrans_transactions_user_id ON public.midtrans_transactions(user_id);
