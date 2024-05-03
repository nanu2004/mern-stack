import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AddItemsToBag } from './CategoryItems/bag/AddItemsToBag';
import { useSearch } from './SearchContext';

function Product() {
  const [products, setProducts] = useState([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    if (searchQuery) {
      fetchProductsByCategory(searchQuery);
    } else {
      fetchProducts();
    }
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/app/get_all_products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:3000/app/search?category=${category}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
  };

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

  function handleAddToWishlist(product) {
    // Implement your logic to add product to the wishlist
    // You can use localStorage or any other method to store wishlist items
    console.log('Added to wishlist:', product);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <Link to={`/product/${product._id}`} className="hover:cursor-pointer">
              <FontAwesomeIcon icon={faHeart} className="text-red-500 absolute top-0 right-0 m-4" onClick={() => handleAddToWishlist(product)} />
              <img
                src="https://media.istockphoto.com/id/1759861050/photo/portrait-of-beautiful-indian-bride-getting-ready-for-her-wedding-ceremony.jpg?s=612x612&w=is&k=20&c=TVhmJ8w1t0by2fHXU9GCqiJwaDT7YahDET-zBNOstgI="
                alt={product.name}
                className="mb-4 object-cover h-48 w-full rounded-md"
              />
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <span className="text-green-600 font-semibold">${product.price}</span>
              </div>
            </Link>
            <Link to="/wishlist" className="text-red-500 absolute bottom-0 right-0 m-4">
              <FontAwesomeIcon icon={faHeart} className="hover:text-red-700" />
            </Link>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => handleAddToCart(product)}
            >
              Add to bag
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <AddItemsToBag />
      </div>
    </div>
  );
}

export default Product;
