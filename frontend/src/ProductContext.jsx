import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, sortOption]);

  const apiUrl = "http://localhost:5000/app/products/get_all_Products_for_testing";

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const filteredProducts = searchTerm
        ? data.filter(product => product.category.includes(searchTerm))
        : data;

      let sortedProducts = [...filteredProducts];
      if (sortOption === 'priceLowToHigh') {
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'priceHighToLow') {
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProductData(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleCardClick = (category) => {
    setSearchTerm(category);
  };

  return (
    <ProductContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        productData,
        loading,
        sortOption,
        categories,
        handleSortOptionChange,
        handleCardClick,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};