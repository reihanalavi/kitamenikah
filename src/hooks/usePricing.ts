
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePricing = () => {
  return useQuery({
    queryKey: ['pricing'],
    queryFn: async () => {
      // Fetch pricing data with benefits
      const { data: pricingData, error } = await supabase
        .from('Pricing')
        .select(`
          *,
          PricingBenefit (
            benefit
          )
        `)
        .order('harga_paket', { ascending: true });

      if (error) {
        console.error('Error fetching pricing:', error);
        throw error;
      }

      return pricingData;
    },
  });
};
