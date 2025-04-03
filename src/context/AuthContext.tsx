import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const defaultValue: AuthContextType = {
  user: { username: '', isAuthenticated: false },
  isAuthenticated: false,
  isLoading: true,
  login: () => false,
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

const isValidUser = (data: unknown): data is User => {
  if (!data || typeof data !== 'object') return false;
  const user = data as User;
  return (
    typeof user.username === 'string' &&
    typeof user.isAuthenticated === 'boolean'
  );
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: '',
    isAuthenticated: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        if (!isValidUser(parsedUser)) {
          throw new Error('Failed to authenticate user');
        }
        setUser({ ...parsedUser, isAuthenticated: true });
      } catch (error) {
        console.error(error);
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === '1234') {
      const authenticatedUser = { username, isAuthenticated: true };
      setUser(authenticatedUser);

      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      return true;
    }

    return false;
  };

  const logout = (): void => {
    setUser({ username: '', isAuthenticated: false });
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: user.isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
