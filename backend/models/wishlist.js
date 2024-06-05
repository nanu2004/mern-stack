// models/Wishlist.js

import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  }
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export  {Wishlist};
