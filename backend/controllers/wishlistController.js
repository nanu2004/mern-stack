import Wishlist from '../models/wishlistModel.js'; // Import the Wishlist model
import productModel from "../models/productModel.js";

// Add item to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId; // Assuming userId is added to req.user by auth middleware

    // Find or create wishlist for user
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    // Add product to wishlist if not already present
    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
      res.status(200).json({ message: 'Product added to wishlist' });
    } else {
      res.status(400).json({ message: 'Product already in wishlist' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    // Find wishlist for user
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove product from wishlist
    wishlist.items = wishlist.items.filter(item => item.toString() !== productId);
    await wishlist.save();
    
    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items');
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addToWishlist, removeFromWishlist, getWishlist };
