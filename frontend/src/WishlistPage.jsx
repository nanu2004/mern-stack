import React, { useEffect } from 'react';
import { useWishlist } from './context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/cart';
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlist();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist(); // Fetch wishlist items when component mounts
  }, [fetchWishlist]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Added to cart');
      navigate('/cart'); // Navigate to cart page after adding to cart
      return updatedCart;
    });
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Wishlist</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {wishlist.length === 0 ? (
          <p className="text-lg">No items in wishlist</p>
        ) : (
          wishlist.map((product) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden w-80 transform transition-all hover:scale-105 relative"
              key={product._id}
            >
              <img
                src={`http://localhost:3000/product/product-photo/${product._id}`}
                className="w-full h-48 object-cover"
                alt={product.name}
              />
              <div className="p-4 flex flex-col">
                <h5 className="text-2xl font-bold mb-2">{product.name}</h5>
                <p className="text-gray-700 mb-2">{product.description.substring(0, 30)}...</p>
                <p className="text-gray-900 font-bold mb-4">$ {product.price}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center mb-2"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                >
                  Remove
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
