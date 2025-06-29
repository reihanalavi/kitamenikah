
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data: templatesData, error } = await supabase
        .from('Template')
        .select('*')
        .order('createdAt', { ascending: true });

      if (error) {
        console.error('Error fetching templates:', error);
        throw error;
      }

      return templatesData;
    },
  });
};
