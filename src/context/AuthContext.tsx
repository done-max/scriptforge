import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import type { UserProfile, DispatchedEmail } from '../services/api';

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
        const token = localStorage.getItem('scriptforge_auth_token');
        if (token) {
          const res = await api.getMe();
          setUser(res.user);
          fetchEmails();
        } else {
          // Open auth modal if not authenticated
          setIsAuthModalOpen(true);
        }
      } catch {
        api.removeToken();
        setUser(null);
        setIsAuthModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await api.getEmails();
      setEmails(res.emails);
    } catch {
      // ignore
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.signup(username, email, password);
      setUser(res.user);
      setIsAuthModalOpen(false);
      setLastEmailNotice(`Welcome email with your credentials was dispatched to ${email}!`);
      await fetchEmails();
      setTimeout(() => setLastEmailNotice(null), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.login(usernameOrEmail, password);
      setUser(res.user);
      setIsAuthModalOpen(false);
      setLastEmailNotice(`Login security receipt dispatched to ${res.user.email}!`);
      await fetchEmails();
      setTimeout(() => setLastEmailNotice(null), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async () => {
    setIsLoading(true);
    try {
      const res = await api.demoLogin();
      setUser(res.user);
      setIsAuthModalOpen(false);
      setLastEmailNotice(`Demo session activated! Confirmation sent to ${res.user.email}`);
      await fetchEmails();
      setTimeout(() => setLastEmailNotice(null), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setEmails([]);
      setIsAuthModalOpen(true);
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
