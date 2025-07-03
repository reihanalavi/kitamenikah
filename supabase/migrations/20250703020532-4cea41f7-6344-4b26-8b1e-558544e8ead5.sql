
-- Add columns to store pricing package and template information separately
ALTER TABLE public.midtrans_transactions
ADD COLUMN pricing_package_name TEXT,
ADD COLUMN template_name TEXT,
ADD COLUMN pricing_package_id BIGINT,
ADD COLUMN template_id TEXT;

-- Add foreign key constraints for better data integrity
ALTER TABLE public.midtrans_transactions
ADD CONSTRAINT fk_pricing_package
FOREIGN KEY (pricing_package_id)
REFERENCES public."Pricing"(id)
ON DELETE SET NULL;

ALTER TABLE public.midtrans_transactions
ADD CONSTRAINT fk_template
FOREIGN KEY (template_id)
REFERENCES public."Template"(id)
ON DELETE SET NULL;
