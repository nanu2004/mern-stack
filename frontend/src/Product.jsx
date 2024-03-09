import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

function Product() {
  
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app/get_all_products');
        setProducts(response.data.data); // Update this line to access the correct property
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  function handleEachProduct(productId, product) {
    navigate(`/product_Details/${productId}`, { state: product });
  }



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(products) &&
          products.map((product) => (
            <div
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:cursor-pointer"
              key={product._id}
              onClick={() => handleEachProduct(product._id, product)}
            >
              <img
                src="https://rukminim1.flixcart.com/image/1550/1350/xif0q/shopsy-makeup-kit/l/d/d/face-makeup-kit-12item-36h-combo-kit-swenky-original-imagrbckheputxff.jpeg?q=20&crop=false"
                alt={product.name}
                className="mb-4 object-cover h-32 w-full rounded-md"
              />
              <h1 className="text-xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="text-green-600 font-semibold">${product.price}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Product;
