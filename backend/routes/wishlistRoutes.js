import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';
import { VerifyToken } from '../middlewares/auth.js'; //

const router = express.Router();

// Route to add an item to the wishlist
router.post('/add', VerifyToken, addToWishlist);

// Route to remove an item from the wishlist
router.delete('/remove', VerifyToken, removeFromWishlist);

// Route to get the wishlist
router.get('/',VerifyToken, getWishlist);

export default router;
