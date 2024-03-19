import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddItemsToBag } from './bag/AddItemsToBag'; // Import AddItemsToBag component

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app/get_all_products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  function handleEachProduct(productId, product) {
    setSelectedProduct(product);
  }

  function handleAddToCart(product) {
    const isConfirmed = window.confirm('Do you want to add this product to your cart?');
    if (isConfirmed) {
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const isProductInCart = existingCartItems.some((item) => item._id === product._id);

      if (!isProductInCart) {
        const updatedCartItems = [...existingCartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        console.log('Updated Cart Items:', updatedCartItems);
      } else {
        alert('Product is already in the cart!');
      }
    }
  }

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-3xl font-bold mb-4">Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col justify-between"
                key={product._id}
                onClick={() => handleEachProduct(product._id, product)}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFA1weAuutW-EX2CiNGwJYpIn_r95fpoTwJ7_10nTbg&s"
                  alt={product.name}
                  className="mb-4 object-cover h-32 w-full rounded-md"
                  onClick={() => handleEachProduct(product._id, product)}
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <span className="text-green-600 font-semibold">${product.price}</span>
                </div>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to bag
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="w-1/2 pl-4">
        <AddItemsToBag product={selectedProduct} />
      </div>
    </div>
  );
}

export default Product;
