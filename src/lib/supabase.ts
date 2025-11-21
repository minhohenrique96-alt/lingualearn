import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          subscription_tier: 'free' | 'basic' | 'premium' | 'enterprise';
          subscription_status: 'active' | 'inactive' | 'trial';
          trial_ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      lessons: {
        Row: {
          id: number;
          title: string;
          description: string;
          level: string;
          duration: string;
          language: string;
          content: string;
          tier_required: string;
          rating: number;
          total_reviews: number;
          created_at: string;
        };
      };
      user_progress: {
        Row: {
          id: number;
          user_id: string;
          lesson_id: number;
          progress: number;
          completed: boolean;
          last_accessed: string;
        };
      };
      reviews: {
        Row: {
          id: number;
          user_id: string;
          lesson_id: number;
          rating: number;
          comment: string;
          created_at: string;
        };
      };
    };
  };
};
