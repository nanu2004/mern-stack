import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      fetchWishlist();
    }
  }, [auth.token]);

  const addToWishlist = async (productId) => {
    if (!auth.token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:3000/wishlist/add', { productId }, { withCredentials: true });
      fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!auth.token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete('http://localhost:3000/wishlist/remove', { data: { productId }, withCredentials: true });
      fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const fetchWishlist = async () => {
    if (!auth.token) return;

    try {
      const response = await axios.get('http://localhost:3000/wishlist', { withCredentials: true });
      setWishlist(response.data.wishlist.items);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
