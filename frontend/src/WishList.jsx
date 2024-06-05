import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/wishlist/items');
      setWishlistItems(response.data.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="mb-4 object-cover h-48 w-full rounded-md"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold mb-2">{item.name}</h1>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <span className="text-green-600 font-semibold">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Wishlist}
