'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create context with no-op defaults
const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const client = supabase();

    // Load initial session if one exists
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for changes (login, logout, token refresh)
    const { data: listener } = client.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      // Clean up subscription on unmount
      listener.subscription?.unsubscribe();
    };
  }, []);

  // Register a brand-new user with email & password
  const signUp = async (email: string, password: string) => {
    const { error } = await supabase().auth.signUp({ email, password });
    if (error) throw error;
  };

  // Log in an existing user with email & password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase().auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

    // context/AuthContext.tsx
    const signInWithGoogle = async () => {
        const { error } = await supabase().auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${location.origin}/auth/callback`,   // 👈 new line
        },
        })
        if (error) throw error
    }
  

  // Log out the current user
  const signOut = async () => {
    const { error } = await supabase().auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ user, session, signUp, signIn, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenient usage
export const useAuth = () => useContext(AuthContext);
