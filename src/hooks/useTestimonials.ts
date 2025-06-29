
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data: testimonialsData, error } = await supabase
        .from('LandingpageTestimony')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }

      return testimonialsData;
    },
  });
};
