import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const fetchUserData = async (setAuth) => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/auth/user-auth', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { user } = await response.json();
      console.log('Fetched user data:', user);
      setAuth((prevAuth) => ({ ...prevAuth, user, token }));
    } catch (error) {
      console.error('Failed to fetch user data', error);
      Cookies.remove('token');
      setAuth({ user: null, token: '' });
    }
  }
};

export const fetchAdminData = async (setAuth) => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/auth/admin-auth', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { admin } = await response.json();
      console.log('Fetched admin data:', admin);
      setAuth((prevAuth) => ({ ...prevAuth, user: admin, token, isAdmin: true }));
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      Cookies.remove('token');
      setAuth({ user: null, token: '' });
    }
  } else {
    console.error('Token not found. Unable to fetch admin data.');
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = Cookies.get('token');
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    return { user: storedUser, token, isAdmin: storedUser?.isAdmin || false };
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      if (auth.user?.role === 1) {
        fetchAdminData(setAuth);
      } else {
        fetchUserData(setAuth);
      }
    } else {
      fetchUserData(setAuth);
    }
  }, [auth.user?.role]);

  useEffect(() => {
    console.log('Auth state updated:', auth);
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
