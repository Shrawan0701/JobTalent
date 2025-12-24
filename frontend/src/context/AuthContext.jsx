import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // Email/password signup
  const signup = async (email, password, role, firstName, lastName) => {
    const data = await authService.signup(
      email,
      password,
      role,
      firstName,
      lastName
    );

    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // Email/password login
  const login = async (email, password) => {
    const data = await authService.login(email, password);

    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // 🔥 Google OAuth helper
  const setUserFromToken = (token) => {
    const decoded = jwtDecode(token);

    const user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signup,
        login,
        logout,
        setUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
