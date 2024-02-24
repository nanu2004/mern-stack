// LoginContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
