import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
    if (user) {
      const userMetadata = (user as any).user_metadata || {};
      
      // Check if we have stored profile data in localStorage
      const storedProfile = localStorage.getItem('user_profile');
      
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfileData(parsedProfile);
      } else {
        // Initialize with default values
        const defaultProfile: UserProfileData = {
          full_name: userMetadata.full_name || userMetadata.first_name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          exam_type: 'SAT',
          exam_date: null,
          target_university: 'Harvard University',
          target_universities: ['Harvard', 'MIT', 'Stanford'],
          target_score: 1500
        };
        setProfileData(defaultProfile);
        localStorage.setItem('user_profile', JSON.stringify(defaultProfile));
      }
      setIsLoading(false);
    }
  }, [user]);

  const updateProfile = (updates: Partial<UserProfileData>) => {
    if (profileData) {
      const updatedProfile = { ...profileData, ...updates };
      setProfileData(updatedProfile);
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
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
    updateExamType
  };
};