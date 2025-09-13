import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfileData {
  full_name: string;
  email: string;
  exam_type: string;
  exam_date: string | null;
  target_university: string;
  target_universities: string[];
  target_score: number;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Try Supabase first (source of truth)
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, email, exam_type, exam_date, target_university, target_universities')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const mapped: UserProfileData = {
            full_name: data.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: data.email || user.email || '',
            exam_type: data.exam_type || 'SAT',
            exam_date: data.exam_date ?? null,
            target_university: data.target_university || 'Harvard University',
            target_universities: Array.isArray(data.target_universities) ? data.target_universities : [],
            target_score: 1500,
          };
          setProfileData(mapped);
          localStorage.setItem('user_profile', JSON.stringify(mapped));
        } else {
          // Fallback to localStorage (legacy) or initialize defaults
          const storedProfile = localStorage.getItem('user_profile');
          if (storedProfile) {
            setProfileData(JSON.parse(storedProfile));
          } else {
            const userMetadata = (user as any).user_metadata || {};
            const defaultProfile: UserProfileData = {
              full_name: userMetadata.full_name || userMetadata.first_name || user.email?.split('@')[0] || 'User',
              email: user.email || '',
              exam_type: 'SAT',
              exam_date: null,
              target_university: 'Harvard University',
              target_universities: ['Harvard', 'MIT', 'Stanford'],
              target_score: 1500,
            };
            setProfileData(defaultProfile);
            localStorage.setItem('user_profile', JSON.stringify(defaultProfile));
          }
        }
      } catch (e) {
        console.error('useUserProfile: failed to load profile', e);
        // Graceful fallback to any cached data
        const storedProfile = localStorage.getItem('user_profile');
        if (storedProfile) setProfileData(JSON.parse(storedProfile));
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const persistToSupabase = async (updates: Partial<UserProfileData>) => {
    if (!user) return;
    try {
      const payload: any = {};
      if (updates.full_name !== undefined) payload.full_name = updates.full_name;
      if (updates.email !== undefined) payload.email = updates.email;
      if (updates.exam_type !== undefined) payload.exam_type = updates.exam_type;
      if (updates.exam_date !== undefined) payload.exam_date = updates.exam_date;
      if (updates.target_university !== undefined) payload.target_university = updates.target_university;
      if (updates.target_universities !== undefined) payload.target_universities = updates.target_universities;

      if (Object.keys(payload).length > 0) {
        const { error } = await supabase
          .from('profiles')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
        if (error) throw error;
      }
    } catch (e) {
      console.error('useUserProfile: failed to persist profile', e);
    }
  };

  const updateProfile = (updates: Partial<UserProfileData>) => {
    if (profileData) {
      const updatedProfile = { ...profileData, ...updates };
      setProfileData(updatedProfile);
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
      // Fire and forget save to Supabase
      void persistToSupabase(updates);
    }
  };

  const updateExamDate = (examDate: string) => {
    updateProfile({ exam_date: examDate });
  };

  const updateTargetUniversity = (university: string) => {
    updateProfile({ target_university: university });
  };

  const updateExamType = (examType: string) => {
    updateProfile({ exam_type: examType });
  };

  return {
    profileData,
    isLoading,
    updateProfile,
    updateExamDate,
    updateTargetUniversity,
    updateExamType,
  };
};