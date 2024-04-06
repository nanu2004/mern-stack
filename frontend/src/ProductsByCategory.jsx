import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchComponent from './SearchComponent'; // Import the SearchComponent

function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/products_by_category/${category}`);
        setProducts(response.data.filterProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:3000/app/products_by_category/${category}?search=${searchQuery}`);
      setProducts(response.data.filterProducts);
    } catch (error) {
      console.error('Error searching products:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{category} Products</h2>
      <SearchComponent onSearch={handleSearch} /> {/* Render the SearchComponent */}
      {/* Render the products list */}
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsByCategory;
