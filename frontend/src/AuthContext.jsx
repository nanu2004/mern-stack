// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const localAuth = localStorage.getItem('auth');
    return localAuth ? JSON.parse(localAuth) : { user: null, token: Cookies.get('token') || "" };
  });

  const setAxiosAuthHeaders = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/auth/user');
      const token = Cookies.get('token');
      setAuth({ user: data, token });
      localStorage.setItem('auth', JSON.stringify({ user: data, token }));
      setAxiosAuthHeaders(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuth({ user: null, token: "" });
        localStorage.removeItem('auth');
        Cookies.remove('token');
        setAxiosAuthHeaders(null);
      }
    }
  }, []);

  useEffect(() => {
    const localAuth = localStorage.getItem('auth');
    if (localAuth) {
      const parsedAuth = JSON.parse(localAuth);
      setAuth(parsedAuth);
      setAxiosAuthHeaders(parsedAuth.token);

      if (parsedAuth.token) {
        fetchUserData();
      }
    } else {
      const token = Cookies.get('token');
      if (token) {
        setAxiosAuthHeaders(token);
        fetchUserData();
      }
    }
  }, [fetchUserData]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
