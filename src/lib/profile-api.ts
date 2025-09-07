import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, OnboardingData, ExamType } from "@/types/profile";

export class ProfileApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProfileApiError';
  }
}

export const ProfileAPI = {
  async getProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new ProfileApiError('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new ProfileApiError(`Failed to fetch profile: ${error.message}`);
      }

      if (!data) {
        return null;
      }

      return {
        userId: data.user_id,
        email: data.email,
        full_name: data.full_name,
        examTypes: data.exam_type ? [data.exam_type as ExamType] : [],
        examDate: data.exam_date,
        targetUniversities: (data as any).target_university ? [(data as any).target_university] : [],
        targetCourses: (data as any).target_course ? [(data as any).target_course] : [],
        studyMode: (data as any).study_mode,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      if (error instanceof ProfileApiError) {
        throw error;
      }
      throw new ProfileApiError(`Unexpected error: ${error}`);
    }
  },

  async saveOnboardingData(data: OnboardingData): Promise<UserProfile> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new ProfileApiError('User not authenticated');
      }

      const updateData = {
        exam_type: data.examTypes[0] || null, // Store first exam type for backward compatibility
        exam_date: data.examDate,
        target_university: data.targetUniversities[0] || null,
        target_course: data.targetCourses?.[0] || null,
        updated_at: new Date().toISOString(),
      };

      const { data: profileData, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        throw new ProfileApiError(`Failed to save onboarding data: ${error.message}`);
      }

      return {
        userId: profileData.user_id,
        email: profileData.email,
        full_name: profileData.full_name,
        examTypes: profileData.exam_type ? [profileData.exam_type as ExamType] : [],
        examDate: profileData.exam_date,
        targetUniversities: (profileData as any).target_university ? [(profileData as any).target_university] : [],
        targetCourses: (profileData as any).target_course ? [(profileData as any).target_course] : [],
        studyMode: (profileData as any).study_mode,
        createdAt: profileData.created_at,
        updatedAt: profileData.updated_at,
      };
    } catch (error) {
      if (error instanceof ProfileApiError) {
        throw error;
      }
      throw new ProfileApiError(`Unexpected error: ${error}`);
    }
  },

  async updateExamDate(examDate: string): Promise<void> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new ProfileApiError('User not authenticated');
      }

      const { error } = await supabase
        .from('profiles')
        .update({ 
          exam_date: examDate,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        throw new ProfileApiError(`Failed to update exam date: ${error.message}`);
      }
    } catch (error) {
      if (error instanceof ProfileApiError) {
        throw error;
      }
      throw new ProfileApiError(`Unexpected error: ${error}`);
    }
  }
};