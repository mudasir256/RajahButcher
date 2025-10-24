'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata: any;
  app_metadata: any;
  aud: string;
  created_at: string;
  updated_at: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  role: string;
  factors: any[];
  identities: any[];
  is_anonymous: boolean;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage
    const savedUser = localStorage.getItem('dummy-user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser.user);
      setSession(parsedUser.session);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    // For local-only mode, we'll just simulate a successful signup
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Check for dummy login credentials
    if (email === 'smudasir256@gmail.com' && password === '12345678') {
      // Create a mock user object for dummy login
      const mockUser: User = {
        id: 'dummy-user-id',
        email: 'smudasir256@gmail.com',
        user_metadata: {},
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString(),
        phone: '',
        confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        role: 'authenticated',
        factors: [],
        identities: [],
        is_anonymous: false,
      };

      const mockSession: Session = {
        access_token: 'dummy-access-token',
        refresh_token: 'dummy-refresh-token',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: mockUser,
      };

      setUser(mockUser);
      setSession(mockSession);
      
      // Store user in localStorage for persistence
      localStorage.setItem('dummy-user', JSON.stringify({
        user: mockUser,
        session: mockSession
      }));
      
      return { error: null };
    }

    // For other users, simulate authentication failure
    return { error: { message: 'Invalid credentials' } };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('dummy-user');
    localStorage.removeItem('dummy-cart');
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, loading }}>
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
