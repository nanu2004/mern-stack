import React, { createContext, useContext, useState } from "react";

// Create a context
const ProductContext = createContext();

// Custom hook to use the context
export const useProductContext = () => useContext(ProductContext);

// Provider component to wrap your application
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
