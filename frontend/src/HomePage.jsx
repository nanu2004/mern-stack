// HomePage.jsx
import React from 'react';
import ProductCard from './ProductCard';
import { useProductContext } from './ProductContext';

const HomePage = () => {
  const { productData, loading } = useProductContext(); // Access context data

  return (
    <div className="container mx-auto p-4">
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

export default HomePage;
