// routes/wishlistRoutes.js

import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlistItems } from '../controllers/wishlistController.js';
import { VerifyToken } from '../middlewares/auth.js';

const wishlistRoutes = express.Router();

// Add item to wishlist
wishlistRoutes.post('/add', VerifyToken, addToWishlist);

// Remove item from wishlist
wishlistRoutes.delete('/remove/:id', VerifyToken, removeFromWishlist);

// Get all wishlist items
wishlistRoutes.get('/items', VerifyToken, getWishlistItems);

export { wishlistRoutes };
