import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white">
      <img
        src="https://media.istockphoto.com/id/1759861050/photo/portrait-of-beautiful-indian-bride-getting-ready-for-her-wedding-ceremony.jpg?s=612x612&w=is&k=20&c=TVhmJ8w1t0by2fHXU9GCqiJwaDT7YahDET-zBNOstgI="
        alt={product.title}
        className="w-full h-32 object-cover mb-2 rounded-md"
      />
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-2">Brand: {product.brand}</p>
      <p className="text-sm text-gray-600 mb-2">Price: ${product.price}</p>
      <p className="text-sm text-gray-600 mb-2">Description: {product.description}</p>
    </div>
  );
}

export default ProductCard;
