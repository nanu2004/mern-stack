import React from 'react';
import { useProductContext } from './ProductContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, fetchProducts } = useProductContext();

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button onClick={fetchProducts} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
