import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // If email not confirmed, try to auto-confirm and retry
        if (error.message?.includes('Email not confirmed')) {
          console.log('Email not confirmed, attempting auto-confirmation...');
          
          try {
            // Call edge function to force-confirm the user
            await supabase.functions.invoke('auto-confirm-user', {
              body: { email }
            });
            
            // Retry login after confirmation
            const { error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            
            if (retryError) {
              throw retryError;
            }
            
            console.log('Login successful after auto-confirmation');
            return { error: null };
          } catch (confirmError) {
            console.error('Auto-confirmation failed:', confirmError);
            return { error: new Error('Account setup incomplete. Please try again or contact support.') };
          }
        }
        
        return { error };
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: error.message || 'Login failed' };
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: firstName && lastName ? `${firstName} ${lastName}` : firstName || '',
          }
          // Remove emailRedirectTo completely to disable email confirmation
        }
      });
      
      if (error) {
        return { error };
      }

      // The user should be automatically confirmed without email verification
      console.log('User created successfully:', data.user?.email);
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error: error.message || 'Registration failed' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to home page after successful logout
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    session,
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