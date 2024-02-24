// NavigationContext.jsx
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const navigate = useNavigate();
  return navigate;
};

export const NavigationProvider = ({ children }) => {
  return (
    <NavigationContext.Provider value={useNavigate()}>
      {children}
    </NavigationContext.Provider>
  );
};