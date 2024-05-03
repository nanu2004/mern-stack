// wishlistModel.js (in your models directory)
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  created_at: { type: Date, default: Date.now }
});

const Wishlist = model('Wishlist', wishlistSchema);

export default Wishlist;
