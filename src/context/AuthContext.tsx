import React, { createContext, useState, useEffect, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName: fullName });
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
