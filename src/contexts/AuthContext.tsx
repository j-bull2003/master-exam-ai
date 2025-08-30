import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI, User } from '@/lib/auth-api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user: currentUser, error } = await authAPI.getCurrentUser();
        
        if (currentUser && !error) {
          setUser(currentUser);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user: authUser, error } = await authAPI.login(email, password);
      
      if (authUser && !error) {
        setUser(authUser);
        return { error: null };
      }
      
      return { error: error || 'Login failed' };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: error.message || 'Login failed' };
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { user: authUser, error } = await authAPI.register(email, password, firstName, lastName);
      
      if (authUser && !error) {
        setUser(authUser);
        return { error: null };
      }
      
      return { error: error || 'Registration failed' };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error: error.message || 'Registration failed' };
    }
  };

  const signOut = async () => {
    try {
      await authAPI.logout();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear user state even if logout request fails
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};