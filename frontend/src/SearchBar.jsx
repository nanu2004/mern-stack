import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    setQuery(''); // Clear the search input after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="ml-4 flex">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by category"
        className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
