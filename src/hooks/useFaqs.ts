
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFaqs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data: faqsData, error } = await supabase
        .from('LandingpageFaq')
        .select('*')
        .order('createdAt', { ascending: true });

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }

      return faqsData;
    },
  });
};
