// CategoryButtons.jsx
import React from 'react';
import { useNavigation } from './NavigationContext';

const CategoryButtons = ({ categories, searchTerm, handleCardClick }) => {
  const navigate = useNavigation();

  const handleButtonClick = (category) => {
    // Update the URL and trigger navigation to the category page
    navigate(`/category/${category}`);
    // Optionally, you can still call the existing click handler
    handleCardClick(category);
  };

  return (
    <>
      <p>Categories:</p>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleButtonClick(category)}
            className={`p-2 m-2 ${searchTerm === category ? 'bg-gray-300' : 'bg-gray-100'} rounded`}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryButtons;