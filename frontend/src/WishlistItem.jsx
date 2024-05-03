// WishlistItem.js

import React from 'react';

const WishlistItem = ({ item }) => {
  return (
    <div className="wishlist-item bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <button className="text-red-600 hover:text-red-700">Remove</button>
      </div>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-600 font-semibold">${item.price}</span>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default WishlistItem;
