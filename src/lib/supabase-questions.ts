import { supabase } from "@/integrations/supabase/client";

export interface SATQuestion {
  id: string;
  category: string;
  domain: string;
  subdomain: string;
  stem_html: string;
  choice_a: string;
  choice_b: string;
  choice_c: string;
  choice_d: string;
  correct_choice: string;
  explanation_html: string;
  difficulty: string;
  source: string;
}

export const fetchQuestions = async (
  domain?: string,
  subdomain?: string,
  difficulty?: string,
  category?: string
): Promise<SATQuestion[]> => {
  let query = supabase
    .from('sat_questions' as any)
    .select('*');

  // If category is provided, filter by category (for "all questions" functionality)
  if (category) {
    query = query.eq('category', category);
  } else if (domain) {
    // Otherwise filter by domain
    query = query.eq('domain', domain);
  }

  if (subdomain) {
    query = query.eq('subdomain', subdomain);
  }

  if (difficulty && difficulty !== 'all') {
    query = query.ilike('difficulty', difficulty);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }

  return (data as unknown as SATQuestion[]) || [];
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};