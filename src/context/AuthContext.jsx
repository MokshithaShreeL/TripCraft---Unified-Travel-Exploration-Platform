import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const TEST_USERS = [
  { id: 'usr_priya_01', name: 'Priya Sharma', email: 'priya@example.com', password: 'Test@123', role: 'user', language: 'en', phone: '9876543210', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80' },
  { id: 'usr_arjun_02', name: 'Arjun Kumar', email: 'arjun@example.com', password: 'Test@123', role: 'user', language: 'ta', phone: '9876543211', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80' },
  { id: 'usr_meera_03', name: 'Meera Rajan', email: 'meera@example.com', password: 'Test@123', role: 'user', language: 'hi', phone: '9876543212', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80' },
  { id: 'usr_rahul_04', name: 'Rahul Singh', email: 'rahul@example.com', password: 'Test@123', role: 'user', language: 'en', phone: '9876543213', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80' },
  { id: 'usr_sneha_05', name: 'Sneha Menon', email: 'sneha@example.com', password: 'Test@123', role: 'user', language: 'ta', phone: '9876543214', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
  { id: 'usr_admin_00', name: 'Admin User', email: 'admin@tripcraft.in', password: 'Admin@123456', role: 'admin', language: 'en', phone: '9876543200', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80' }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tripcraft_user') || localStorage.getItem('tripcraft_auth_user');
      return saved ? JSON.parse(saved) : TEST_USERS[0]; // Default to Priya Sharma
    } catch {
      return TEST_USERS[0];
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('tripcraft_token') || localStorage.getItem('tripcraft_jwt_token') || 'demo_jwt_token_2026');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tripcraft_user', JSON.stringify(currentUser));
      localStorage.setItem('tripcraft_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tripcraft_user');
      localStorage.removeItem('tripcraft_auth_user');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Attempt backend login first
      const res = await api.post('/auth/login', { email, password });
      if (res && res.success) {
        localStorage.setItem('tripcraft_token', res.token);
        setToken(res.token);
        setCurrentUser(res.user);
        setIsLoading(false);
        return { success: true, user: res.user };
      }

      // Check pre-seeded demo accounts
      const matched = TEST_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );
      if (matched) {
        const dummyToken = 'jwt_' + matched.id + '_' + Date.now();
        localStorage.setItem('tripcraft_token', dummyToken);
        setToken(dummyToken);
        setCurrentUser(matched);
        setIsLoading(false);
        return { success: true, user: matched };
      }

      setIsLoading(false);
      return { success: false, message: 'Invalid email or password' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, message: err.message };
    }
  };

  const loginWithGoogle = async () => {
    // Simulated Google OAuth Flow
    setIsLoading(true);
    const googleUser = {
      id: 'usr_google_' + Date.now().toString().slice(-4),
      name: 'Google Traveler',
      email: 'traveler.google@gmail.com',
      role: 'user',
      language: 'en',
      auth_provider: 'google',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
    };
    const mockToken = 'google_jwt_token_' + Date.now();
    localStorage.setItem('tripcraft_token', mockToken);
    setToken(mockToken);
    setCurrentUser(googleUser);
    setIsLoading(false);
    return { success: true, user: googleUser };
  };

  const quickLogin = (user) => {
    const mockToken = 'quick_jwt_' + user.id;
    localStorage.setItem('tripcraft_token', mockToken);
    setToken(mockToken);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('tripcraft_token');
    localStorage.removeItem('tripcraft_user');
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        isLoading,
        login,
        loginWithGoogle,
        quickLogin,
        logout,
        testUsers: TEST_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
