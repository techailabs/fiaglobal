import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, signIn, signOut, getUserProfile } from '@/lib/supabase';
import { useLocation } from 'wouter';
import { User } from '@shared/schema';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          const userProfile = await getUserProfile(data.session.user.id);
          setUser(userProfile);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial check
    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userProfile = await getUserProfile(session.user.id);
        setUser(userProfile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await signIn(email, password);
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const userProfile = await getUserProfile(data.session.user.id);
        setUser(userProfile);
        
        // Redirect based on user role
        switch (userProfile.role) {
          case 'admin':
            setLocation('/admin/dashboard');
            break;
          case 'csp_agent':
            setLocation('/csp/dashboard');
            break;
          case 'auditor':
            setLocation('/auditor/dashboard');
            break;
          case 'bank_officer':
            setLocation('/officer/dashboard');
            break;
          case 'customer':
            setLocation('/customer/dashboard');
            break;
          default:
            setLocation('/');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
      setLocation('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}