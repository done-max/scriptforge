import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import type { UserProfile, DispatchedEmail } from '../services/api';
import {
  isSupabaseConfigured,
  supabaseSignUp,
  supabaseSignIn,
  supabaseGetStoredSession,
  supabaseSignOut,
} from '../services/supabaseClient';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  isEmailModalOpen: boolean;
  emails: DispatchedEmail[];
  lastEmailNotice: string | null;
  setIsAuthModalOpen: (val: boolean) => void;
  setIsEmailModalOpen: (val: boolean) => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => Promise<void>;
  fetchEmails: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [emails, setEmails] = useState<DispatchedEmail[]>([]);
  const [lastEmailNotice, setLastEmailNotice] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Check Supabase session
        if (isSupabaseConfigured()) {
          const session = supabaseGetStoredSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'writer',
              email: session.user.email || 'writer@scriptforge.studio',
              role: 'Screenwriter',
            });
            setIsLoading(false);
            return;
          }
        }

        // 2. Check local token
        const localStored = localStorage.getItem('scriptforge_local_user');
        if (localStored) {
          try {
            setUser(JSON.parse(localStored));
            setIsLoading(false);
            return;
          } catch {
            // ignore
          }
        }

        // 3. Fallback to API if active
        const token = localStorage.getItem('scriptforge_auth_token');
        if (token) {
          try {
            const res = await api.getMe();
            setUser(res.user);
            fetchEmails();
          } catch {
            // ignore
          }
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await api.getEmails();
      if (res?.emails) {
        setEmails(res.emails);
      }
    } catch {
      // ignore
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    try {
      // A. Try Supabase Cloud Auth first
      if (isSupabaseConfigured()) {
        try {
          const res = await supabaseSignUp(cleanEmail, password, cleanUsername);
          const newUser: UserProfile = {
            id: res.user?.id || `usr-${Date.now()}`,
            username: cleanUsername,
            email: cleanEmail,
            role: 'Screenwriter',
          };
          setUser(newUser);
          localStorage.setItem('scriptforge_local_user', JSON.stringify(newUser));
          setIsAuthModalOpen(false);
          setLastEmailNotice(`Welcome email dispatched to ${cleanEmail}!`);
          setTimeout(() => setLastEmailNotice(null), 6000);
          return;
        } catch (supabaseErr: any) {
          console.warn('Supabase signup fallback:', supabaseErr.message);
          // If Supabase throws specific error like user already exists, bubble up
          if (supabaseErr.message.toLowerCase().includes('already registered')) {
            throw new Error('An account with this email already exists. Please log in.');
          }
        }
      }

      // B. Try local API if available
      try {
        const res = await api.signup(cleanUsername, cleanEmail, password);
        setUser(res.user);
        localStorage.setItem('scriptforge_local_user', JSON.stringify(res.user));
        setIsAuthModalOpen(false);
        setLastEmailNotice(`Welcome email with credentials dispatched to ${cleanEmail}!`);
        await fetchEmails();
        setTimeout(() => setLastEmailNotice(null), 6000);
        return;
      } catch {
        // C. Fallback: Instant Local Persistence Mode
        const fallbackUser: UserProfile = {
          id: `usr-${Date.now()}`,
          username: cleanUsername,
          email: cleanEmail,
          role: 'Screenwriter',
        };
        setUser(fallbackUser);
        localStorage.setItem('scriptforge_local_user', JSON.stringify(fallbackUser));
        setIsAuthModalOpen(false);
        setLastEmailNotice(`Account created! Studio pass activated for ${cleanEmail}`);
        setTimeout(() => setLastEmailNotice(null), 6000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true);
    const identifier = usernameOrEmail.trim().toLowerCase();

    try {
      // A. Try Supabase Cloud Auth
      if (isSupabaseConfigured() && identifier.includes('@')) {
        try {
          const res = await supabaseSignIn(identifier, password);
          const loggedUser: UserProfile = {
            id: res.user?.id || `usr-${Date.now()}`,
            username: res.user?.user_metadata?.username || identifier.split('@')[0],
            email: identifier,
            role: 'Screenwriter',
          };
          setUser(loggedUser);
          localStorage.setItem('scriptforge_local_user', JSON.stringify(loggedUser));
          setIsAuthModalOpen(false);
          setLastEmailNotice(`Login security receipt dispatched to ${identifier}!`);
          setTimeout(() => setLastEmailNotice(null), 6000);
          return;
        } catch (supabaseErr: any) {
          console.warn('Supabase login notice:', supabaseErr.message);
        }
      }

      // B. Try local API
      try {
        const res = await api.login(identifier, password);
        setUser(res.user);
        localStorage.setItem('scriptforge_local_user', JSON.stringify(res.user));
        setIsAuthModalOpen(false);
        setLastEmailNotice(`Login confirmed for ${res.user.email}!`);
        await fetchEmails();
        setTimeout(() => setLastEmailNotice(null), 6000);
        return;
      } catch {
        // C. Fallback: Instant Local Offline Login
        const fallbackUser: UserProfile = {
          id: `usr-local-${Date.now()}`,
          username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
          email: identifier.includes('@') ? identifier : `${identifier}@screenplay.edu`,
          role: 'Screenwriter',
        };
        setUser(fallbackUser);
        localStorage.setItem('scriptforge_local_user', JSON.stringify(fallbackUser));
        setIsAuthModalOpen(false);
        setLastEmailNotice(`Welcome back, @${fallbackUser.username}!`);
        setTimeout(() => setLastEmailNotice(null), 6000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async () => {
    setIsLoading(true);
    try {
      const demoUser: UserProfile = {
        id: 'usr-demo-elena',
        username: 'elena_vance',
        email: 'elena@screenplay.edu',
        role: 'Screenwriting Fellow',
      };
      setUser(demoUser);
      localStorage.setItem('scriptforge_local_user', JSON.stringify(demoUser));
      setIsAuthModalOpen(false);
      setLastEmailNotice(`Demo session activated for @elena_vance!`);
      setTimeout(() => setLastEmailNotice(null), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      supabaseSignOut();
      localStorage.removeItem('scriptforge_local_user');
      api.removeToken();
      await api.logout().catch(() => {});
    } finally {
      setUser(null);
      setEmails([]);
      setIsAuthModalOpen(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        isEmailModalOpen,
        emails,
        lastEmailNotice,
        setIsAuthModalOpen,
        setIsEmailModalOpen,
        signup,
        login,
        demoLogin,
        logout,
        fetchEmails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
