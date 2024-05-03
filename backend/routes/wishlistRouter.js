// wishlistRouter.js (in your routes directory)
import express from 'express';
import { addToWishlist, removeFromWishlist, getUserWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

// Routes
router.post('/', addToWishlist);
router.delete('/:userId/:productId', removeFromWishlist);
router.get('/:userId', getUserWishlist);

export default wishlistRouter;
