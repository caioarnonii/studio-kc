import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'belezapro_auth';

interface AuthUser {
  email: string;
  name: string;
  loggedAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    // Mock login – accepts any credentials
    const authUser: AuthUser = {
      email,
      name: email.split('@')[0],
      loggedAt: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
