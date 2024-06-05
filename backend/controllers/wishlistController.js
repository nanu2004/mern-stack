// controllers/wishlistController.js

import { Wishlist } from '../models/wishlist.js';
import { VerifyToken } from '../middlewares/auth.js'; // Import VerifyToken middleware

// Function to add an item to the wishlist
const addToWishlist = async (req, res) => {
  const { userId, productId, productName, productPrice } = req.body;
  try {
    const newItem = new Wishlist({ userId, productId, productName, productPrice });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to get wishlist items for a specific user
const getWishlistItems = async (req, res) => {
  const userId = req.userData.userId; // Get userId from the decoded token attached by VerifyToken middleware
  try {
    const wishlistItems = await Wishlist.find({ userId });
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to remove an item from the wishlist
const removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { addToWishlist, getWishlistItems, removeFromWishlist };
