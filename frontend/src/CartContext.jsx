import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartContext Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  // Add item to cart
  const addItemToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Remove item from cart
  const removeItemFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Decrease quantity of an item in cart
  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Increase quantity of an item in cart
  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, decreaseQuantity, increaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
