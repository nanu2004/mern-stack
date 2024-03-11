import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/product_Details/${productId}`, { state: product });
  }

  function handleAddToCart(product) {
    // Get existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const isProductInCart = existingCartItems.some((item) => item._id === product._id);

    if (!isProductInCart) {
      // If the product is not in the cart, add it
      const updatedCartItems = [...existingCartItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Log the updated cart items in the console
      console.log('Updated Cart Items:', updatedCartItems);

      alert('Product added to cart!');
    } else {
      // If the product is already in the cart, you can handle it accordingly (e.g., show a message)
      alert('Product is already in the cart!');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(products) &&
          products.map((product) => (
            <div
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col justify-between"
              key={product._id}
              onClick={() => handleEachProduct(product._id, product)} // Added onClick event to the entire div
            >
              <img
                src="https://rukminim1.flixcart.com/image/1550/1350/xif0q/shopsy-makeup-kit/l/d/d/face-makeup-kit-12item-36h-combo-kit-swenky-original-imagrbckheputxff.jpeg?q=20&crop=false"
                alt={product.name}
                className="mb-4 object-cover h-32 w-full rounded-md"
                onClick={() => handleEachProduct(product._id, product)} // Added onClick event to the image
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
  );
}

export default Product;
