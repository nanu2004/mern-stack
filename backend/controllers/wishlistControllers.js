// wishlist.js (in your routes directory)
import express from 'express';
import Wishlist from '../models/wishlistModels.js';

const router = express.Router();

// Add product to wishlist
router.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlistItem = new Wishlist({ user: userId, product: productId });
    await wishlistItem.save();
    res.status(201).json({ message: 'Product added to wishlist successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove product from wishlist
router.delete('/:userId/:productId', async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.params.userId, product: req.params.productId });
    res.json({ message: 'Product removed from wishlist successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's wishlist
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.params.userId }).populate('product');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
