import React from 'react';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import CategoryButtons from './CategoryButtons';
import ProductCard from './ProductCard';
import { useProductContext } from './ProductContext';  // <-- Import statement for useContext

const ProductDetail = () => {
  const {
    searchTerm,
    setSearchTerm,
    productData,
    loading,
    sortOption,
    categories,
    handleSortOptionChange,
    handleCardClick,
  } = useProductContext();

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortDropdown sortOption={sortOption} handleSortOptionChange={handleSortOptionChange} />
      <CategoryButtons categories={categories} searchTerm={searchTerm} handleCardClick={handleCardClick} />

      <div className="flex flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : productData.length === 0 ? (
          <p>No products found.</p>
        ) : (
          productData.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default ProductDetail;