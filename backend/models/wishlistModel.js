import mongoose from 'mongoose';

// Define the Wishlist schema
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    }
  ],
}, { timestamps: true });

// Export the Wishlist model
export default mongoose.model('Wishlist', wishlistSchema);
