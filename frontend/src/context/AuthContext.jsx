import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import * as authService from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===============================
     RESTORE SESSION (JWT ONLY)
  =============================== */
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');

    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);

        setToken(savedToken);
        setUser({
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (err) {
        // invalid / expired token
        localStorage.removeItem('auth_token');
      }
    }

    setLoading(false);
  }, []);

  /* ===============================
     SIGNUP
  =============================== */
  const signup = async (email, password, role, firstName, lastName) => {
    // clear old session
    localStorage.clear();

    const data = await authService.signup(
      email,
      password,
      role,
      firstName,
      lastName
    );

    localStorage.setItem('auth_token', data.token);

    const decoded = jwtDecode(data.token);

    setToken(data.token);
    setUser({
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    return decoded;
  };

  /* ===============================
     LOGIN
  =============================== */
  const login = async (email, password) => {
    // clear old session
    localStorage.clear();

    const data = await authService.login(email, password);

    localStorage.setItem('auth_token', data.token);

    const decoded = jwtDecode(data.token);

    setToken(data.token);
    setUser({
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    return decoded;
  };

  /* ===============================
     GOOGLE OAUTH
  =============================== */
  const setUserFromToken = (token) => {
    localStorage.clear();
    localStorage.setItem('auth_token', token);

    const decoded = jwtDecode(token);

    setToken(token);
    setUser({
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });
  };

  /* ===============================
     LOGOUT
  =============================== */
  const logout = () => {
    localStorage.clear();
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
