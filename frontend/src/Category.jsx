// Home Component
import React from 'react';
import ProductDetail from './ProductDetail';
import { ProductProvider } from './ProductContext';

const Category = () => {
  return (
<div>
<ProductProvider>
      <ProductDetail />
    </ProductProvider>
</div>
  );
};

export default Category;