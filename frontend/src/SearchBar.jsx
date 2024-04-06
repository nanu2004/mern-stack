// SearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing
import ProductCard from './ProductCard';

function SearchBar({ onSearch }) {
  const [category, setCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/app/search?category=${category}`);
      setSearchResults(response.data.data); // Store search results
      onSearch(response.data.data); // Pass search results to the parent component
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Filter by category"
        className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {/* Render search results */}
        {searchResults.map((product) => (
          <NavLink to={`/category/${product.category}`} key={product._id} className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out">
            <ProductCard product={product} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
